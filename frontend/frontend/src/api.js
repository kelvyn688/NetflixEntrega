const API_DNS = "http://localhost:8080/medias"

export const categories = [
    {
        name: "trending",
        title: "Em Alta",
        path: "/trending?id=",
        isLarge: true
    },
    {
        name: "netflixOriginals",
        title: "Originais Netflix",
        path: "/netflixoriginals?id=",
        isLarge: false
    },
    {
        name: "topRated",
        title: "Populares",
        path: "/toprated?id=",
        isLarge: false
    },
    {
        name: "comedy",
        title: "Comédias",
        path: "/comedy?id=",
        isLarge: false
    },  
    {
        name: "romances",
        title: "Romances",
        path: "/romance?id=",
        isLarge: false
    },
    {
        name: "documentaries",
        title: "Documentários",
        path: "/documentary?id=",
        isLarge: false
    }
]

export const getMovies = async (path) => {

    try {
        let url = API_DNS + path
        const response = fetch(url)

        return (await response).json()
    } catch (error) {
        console.log("error getMovies: ", error)
    }

    return url; 
}