
export const searchMovies = async (searchTerm: string) => {
    const prepared_string = searchTerm.toLowerCase();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTY5MTcxMTc5OS44ODEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEf4iMPiwzpLvKOgqzZJFFzdFT_9GSMmZt4ZLe0Mfyw'
        }
    };

    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${prepared_string}&include_adult=true&language=en-US&page=1`, options);
        const data = await res.json();
        return data.results;
    } catch (err) {
        console.error(err);
        return null;
    }
}