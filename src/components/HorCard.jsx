import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import Image from "next/image"
  import { BsCartPlus } from "react-icons/bs"
  import { Button } from "./ui/button"
  import { Avatar,AvatarImage,AvatarFallback } from "./ui/avatar"
  import { cn } from "@/lib/utils"
  
  export default function HorCard({hideCart,disableCard,product}){
      const {name,price,images,description,seller} = product;
    return(
      <div className="min-w-[280px] hover:shadow-2xl relative border shadow rounded w-full">
        <div className={cn(disableCard?"":"hidden","bg-slate-400/40 h-full w-full absolute rounded-sm z-50")}/>
        <div className={cn(hideCart ? "h-[403px]" : "m-2")}>
          <div className="relative w-full h-[290px] flex sm:flex-col flex-row items-center gap-3">
            <Image src={images[0].url} alt="Product image" width={200} height={200} className={cn(disableCard?"grayscale":"","overflow-hidden my-auto border pt-5 pb-5 pr-1 pl-1")}/>
            <div className="mx-auto mr-2">
              <h1 className="font-semibold pt-2">{name}</h1>
              <span className="text-slate-500 text-sm text-wrap">{description.substring(0,35)}</span>
              <div className={cn(hideCart ? "hidden" : "flex","gap-1 items-center mt-1")}>
                <Avatar className="cursor-pointer hover:drop-shadow-2xl w-4 h-4">
                  <AvatarImage src={seller.profile_pic} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-slate-500 text-sm">{seller.username}</span>
              </div>
              <div className="flex justify-between mt-6 items-center">
                <div className='text-sm p-2 border-2 rounded-md'>{price}₹</div>
                <Button className={cn(hideCart?'hidden':"",'rounded-md text-md')}>
                  <BsCartPlus />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }