
export const COLUMNS = [
    {
        Header:"NO",
        accessor:d=>d.index,
        id:"row",
        Cell:({row})=>{
            return<div>{row.index+1}</div>}
        }, 

    {
        Header:"MOVIE NAME",
        accessor:"original_title"
    },
    {
        Header:"IMDB RATING", 
        accessor:"imdb_rating",
     },
    //  {
    //     Header:"CINETRAIL RATING", 
    //     accessor:"",
                  
    //  }
    
     
]

