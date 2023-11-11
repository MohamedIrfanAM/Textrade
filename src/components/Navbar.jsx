'use client'
import {BsCartCheck} from 'react-icons/bs'
import {TbShoppingCartDollar} from 'react-icons/tb'
import Searchbar from './Searchbar'
import Profile from './Profile'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from "next/link"

const Navbar = () => {
  const pathname = usePathname()
  const showHeader = (pathname === '/login' || pathname === '/signup') ? false : true;
  if(!showHeader) return null;

  return (
    <>
      <nav className="w-full border border-b-2 flex justify-center sm:gap-5 gap-2 p-2 items-center text-lg ">
        <p className='hidden sm:flex'>textrade.store</p>
        <Searchbar/>
          <Link href = "/sell">
            <Button className="hidden sm:flex">
              <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
            </Button>
          </Link>
          <Link href = "/cart">
            <Button className="hidden sm:flex">
              <BsCartCheck className='mr-2 h-4 w-4'/> Cart 
            </Button>
          </Link>
        <div>
          <Profile className="sm:flex hidden"/>
        </div>
      </nav>
      <nav className="sm:hidden fixed bottom-0 w-full border border-b-2 flex justify-evenly gap-5 p-2 items-center text-lg">
          <Link href = "/sell">
            <Button>
              <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
            </Button>
          </Link>
        <p>textrade.store</p>
          <Link href = "/cart">
            <Button>
              <BsCartCheck className='mr-2 h-4 w-4'/> Cart 
            </Button>
          </Link>  
      </nav>

    </>
  )
}

export default Navbar