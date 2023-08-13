import Seo from "@/components/Seo";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

async function fetchData() {
    const res = await fetch('http://localhost:3000/api/movies', {
        cache: 'no-store',
    })
    const { results } = await res.json()
    return results;
}

export default function Home() {
    const router = useRouter();
    const [movies, setMovies] = useState();

    const handleClick = (id, title) => {
        router.push(`/movies/${title}/${id}`);
    };

    useEffect( () => {
       (async () => {
           const results = await fetchData();
           setMovies(results);
       })()
    }, []);

    return (
        <div>
            <Seo title={'Home'}/>
            <div className="container">
                {!movies && <h4>Loading ...</h4>}
                {movies?.map(movie => (
                    <div className="movie" key={movie.id} onClick={() => handleClick(movie.id, movie.original_title)}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                        <h4>
                            <Link
                                href={`/movies/${movie.original_title}/${movie.id}`}
                            >
                                {movie.original_title}
                            </Link>
                        </h4>
                    </div>
                ))}
            </div>
            <style jsx>{`
                 .container {
                   display: grid;
                   grid-template-columns: 1fr 1fr;
                   padding: 20px;
                   gap: 20px;
                 }
                 .movie img {
                   max-width: 100%;
                   border-radius: 12px;
                   transition: transform 0.2s ease-in-out;
                   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                 }
                 .movie:hover img {
                   transform: scale(1.05) translateY(-10px);
                 }
                 .movie h4 {
                   font-size: 18px;
                   text-align: center;
                 }
           `}</style>
        </div>
    );
}
