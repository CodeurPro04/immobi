
import { Link } from "react-router-dom";
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Search,ShieldCheck,Headset} from "lucide-react"
import PropertyCard from "../components/PropertyCard";
import properties from "../components/Properties"
// import GoogleMap from "../components/GoogleMap";
export default function Home() {
  
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bien,setBien]=useState("")
   const [transaction,setTransaction]=useState("")
   const [ville,setVille]=useState("")
   const [prix,setPrix]=useState("")



  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://darkgrey-dugong-226404.hostingersite.com/api/get_all_properties.php"
        );
      
        if (res.data.success) {
          setProperties(res.data.data.slice(0, 4));
        } else {
          setError("Erreur serveur : données non disponibles");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des biens");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleRecherche = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.get(
        "https://darkgrey-dugong-226404.hostingersite.com/api/get_all_properties.php",
        {
          params: {
            type: bien,
            transaction,
            city: ville,
            maxPrice: prix.replace(/\s/g, ""),
            limit: 4, // si ton backend le supporte
          },
        }
      );
       setProperties(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">

      {/* ==========================
          HERO SECTION
      ===========================*/}
      <section className= "items-center justify-center overflow-hidden ">
        <div className=" flex flex-col bg-[#0D6EFD] md:flex-row  ">
        
        
        <div className=" text-center p-20 sm:px-8 lg:px-12 md:w-1/2">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-8 text-white">
            Trouvez votre bien immobilier idéal
          </h1>

          <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto mb-12">
            Découvrez des milliers de propriétés à vendre et à louer dans toute la Côte d'Ivoire.
          </p>
          <div className='space-x-6'>
            <Link to="" className="p-2 hover:cursor-pointer bg-white  shadow rounded text-black font-bold"  >Rechercher</Link>
             
            <Link to='/contact' className="bg-transparent border-white text-white hover:bg-white  hover:text-black hover:cursor-pointer p-4  shadow  rounded">S'inscrire</Link>
          </div>
        </div>

        <div className=" md:w-1/2 mt-8 md:mt-0">
          <img
            src="home-2.png"
            className="w-full h-full  object-cover rounded"
          />
        </div>
         </div>
      </section>
    
<section className='mx-auto my-10 max-w-6xl '>
  <div className='mt-15 bg-white shadow-2xl justify-center items-center m-10 p-15'>
    <div className="ml-5">
    <form className='' onSubmit={handleRecherche}>
<h1 className='text-black text-2xl text-center mt-5 font-bold'>Recherche avancée</h1>
<div className=' grid 
            grid-cols-1 
           
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-5 sm:gap-6 mt-5'>
              <div className='flex flex-col'>
                <label className="mb-1 ">Type de bien</label>
                <select
                 value={bien}
            onChange={(e) => setBien(e.target.value)}
            className="border-2 rounded-md py-1 px-2 mb-1">
<option value=''>Tous</option>
<option value='appartement'>Appartement</option>
<option value='maison'>Maison</option>
<option value='villa'>Villa</option>
<option value='studio'>Studio</option>
<option value='bureau'>Bureau</option>
<option value='commercial'>commercial</option>
                </select>
                </div>
                 <div className='flex flex-col'>
                <label className="mb-1">Transaction</label>
                <select
                value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
            className="border-2 rounded-md py-1 px-2 ">
                
<option value=''> tous</option>
<option value='vente'>Vente</option>
<option value='location'>Location</option>
 </select>
 </div>
  <div className='flex flex-col'>
   <label className="mb-1">Ville</label>
<input className='border-gray-500 border p-2 rounded'
placeholder='ex:Abidjan'
value={ville}
onChange={(e)=>setVille(e.target.value)

}
/>
</div>
  <div className='flex flex-col'>
   <label className="">Prix max</label>
<input className='border-gray-300 border p-2 rounded'
placeholder='ex:50 000 000 FCF'
type='text'
value={prix}
onChange={(e)=>setPrix(e.target.value)

}
/>
   </div>
  </div>  
  <div className='text-center mt-5'>
<button className="p-4 hover:cursor-pointer bg-blue-500  shadow rounded text-white font-bold text-center"  
type ='submit ' >rechercher</button>
</div>

</form>
</div>
</div>
</section>
<section className="bg-white w-full  min-h-screen">
  <div className=" mx-auto  max-w-7xl px-4">
  <h1 className="font-bold text-3xl text-center mb-5">Proprietés en  vedette</h1>
{loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  px-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className=" text-center justify-center mt-5 ">
        <Link to ='/properties' className='text-white  mt-15  hover:cursor-pointer border p-2 bg-[#4C3BB8]    text-center'>voir toutes les proprietés</Link>
         </div>   
         </div>
</section>

<section className='mt-15  ' >
  <div className='px-4 mx-auto max-w-6xl'>
  <h1 className="text-xl md:text-2xl font-bold text-center">Pourquoi nous choisir? </h1>
 <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 ">
  <div className='flex flex-col items-center shadow-xl px-4 p-6'>
    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
<Search className="text-white w-7 h-7 "/>
    </div>
   <h1 className="text-xl md:text-2xl font-bold ">Recherche facile</h1>
   <p className='text-base md:text-lg text-gray-600'> Trouvez rapidement le bien qui correspond à vos critères grâce à nos filtres avancés.</p>
  </div>
  <div className='flex flex-col items-center shadow-xl px-4 p-6'>
    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
<ShieldCheck className="text-white w-7 h-7 "/>
    </div>
   <h1 className='text-xl font-bold '>Securisé</h1>
   <p className="text-base md:text-lg text-gray-600"> Toutes nos annonces sont vérifiées par nos agents immobiliers professionnels.</p>
  </div>
  <div className='flex flex-col items-center shadow-xl px-4 p-6'>
    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
< Headset className="text-white w-7 h-7 "/>
</div>
   <h1 className='text-xl font-bold  '>Support client</h1>
   <p className="text-base md:text-lg text-gray-600"> Notre équipe est là pour vous accompagner dans votre recherche immobilière.</p>
  </div>
  </div>
 </div>
  </section>

</div>
  );
}
