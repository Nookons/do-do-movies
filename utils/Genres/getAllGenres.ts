export const getAllGenres = async (): Promise<any[]> => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTY5MTcxMTc5OS44ODEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEf4iMPiwzpLvKOgqzZJFFzdFT_9GSMmZt4ZLe0Mfyw'
            }
        };

        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
        const response = await fetch(url, options);
        const data = await response.json();
        return data.genres; // genres: [{ id: number, name: string }, ...]

    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch genres');
    }
};
