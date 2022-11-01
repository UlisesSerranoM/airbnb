import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import {format} from "date-fns";
import InfoCard from "../components/infoCard";
import Maps from "../components/Map";

function Search(  {searchResults}) {
    const router = useRouter();
    
    const {location, startDate, endDate,
    noOfGuests} = router.query;

    const formatedStartDate = format(new Date(startDate), "dd MMM yy")
    const formatedEndDate = format(new Date(startDate), "dd MMM yy")
    const range = `${formatedStartDate} - ${formatedEndDate}`

    return(
        <div>

            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>

            <main className="flex">
                <section className="dark:bg-black flex-grow pt-14 px-6">
                    <p className="text-xs dark:text-white">300+ Stays - {range} - for {noOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold
                     mt-2 mb-6 dark:text-white">
                        Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3
                    text-gray-800 whitespace-nowrap">
                        <p className="button">
                            Canceletion Flexibility
                        </p>
                        <p className="button">
                            Type of Place
                        </p>
                        <p className="button">
                            Price
                        </p>
                        <p className="button">
                            Rooms and Beds
                        </p>
                        <p className="button">
                            More filters
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults.map(
                        ({img, location , title, description,star, price, total}) => (
                            <InfoCard
                            key={img}
                            img={img}
                            location={location}
                            title={title}
                            description= {description}
                            star = {star}
                            price={price}
                            total={total}
                            />
                        ))}
                    </div>

                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Maps searchResults={searchResults}/>
                </section>

            </main>

            <Footer />

        </div>
    )
}

export default Search

export async function getServerSideProps() {
    // puedes consultar del objeto de context en el server side prop
    const https = require('https');
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    const searchResults = await fetch("https://links.papareact.com/isz",{
        agent,
    
      }).then(res => res.json());

    return {
        props: {
            searchResults,
        },
    };
}