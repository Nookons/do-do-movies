

export const searchByQuery = async ({genresState, page}: {genresState: string[], page: number}) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTY5MTcxMTc5OS44ODEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEf4iMPiwzpLvKOgqzZJFFzdFT_9GSMmZt4ZLe0Mfyw'
        }
    };

    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&page=${page.toString()}&with_genres=${genresState.join(',')}&primary_release_year=2022&vote_count.gte=100`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}