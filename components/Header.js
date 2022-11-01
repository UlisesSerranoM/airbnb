import Image from "next/image";
import {
    MagnifyingGlassIcon,
    UserCircleIcon,
    Bars3Icon,
    UsersIcon 
} from "@heroicons/react/24/solid"
import {
    GlobeAltIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";


function Header( {placeholder} ){
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [noOfGuests, setnoOfGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setstartDate(ranges.selection.startDate)
        setendDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: "/search",
            //se le aplica query para que pueda compartir el link y se comparta dinamicamente
            query:{
                location: searchInput,
                startDate: startDate.toString(),
                endDate: endDate.toString(),
                noOfGuests
            }
        })
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    }



    return(
        <header className="sticky top-0 z-50 grid
        grid-cols-3 bg-white dark:bg-black shadow-md p-5 md:px-10">
           {/*  left */}
           {/* el md: es para que agarre esa carateristica en patanllas medianas
           relative flex es para que se quede en esa posicion sin importar lo de afuera
           cursosr pointer para que aparezca el cursor cuando el usuario quiera darle click
            */}
            <div className="relative flex items-center h-10
            cursor-pointer my-auto">
                <Image src="https://links.papareact.com/qd3"
                 onClick={() => router.push("/")}
                 layout="fill"
                 objectfit ="contain"
                 objectposition="left"
                 width={"100"}
                 height={"100"}
                />
            </div>
            {/*center  search*/}
            <div className="flex items-center md:border-2
            rounded-full py-2 md:shadow-sm">
                <input 
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    type="text" placeholder={placeholder || "Start your search" }
                    className="flex-grow pl-5 bg-transparent outline-none text-gray-600
                    text-sm placeholder-gray-400"/>
                    <MagnifyingGlassIcon  className="hidden md:inline-flex h-8 bg-red-400
                     text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>

            {/* right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <Bars3Icon className="h-6 cursor-pointer"/>
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>
            {searchInput &&(
                <div className="flex  flex-col col-span-3 mx-auto">
                    <DateRangePicker 
                        ranges={[selectionRange]} 
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                        />
                        <div className="flex items-center border-b mb-4">
                            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                            <UsersIcon className="h-5"/>
                            <input 
                                type={"number"}
                                value={noOfGuests}
                                onChange={(e => setnoOfGuests(e.target.value))}
                                min={1}
                                className="w-12 pl-2 text-lg
                                outline-none text-red-400"
                            />
                        </div>
                        <div className="flex ">
                                <button onClick={resetInput} className="flex-grow text-gray-400">
                                    Cancel
                                </button>

                                <button onClick={search} className="flex-grow text-red-500">
                                    Search
                                </button>
                        </div>
                </div>
            ) }
            
        </header>
    );
}

export default Header;

