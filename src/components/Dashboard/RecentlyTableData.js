
export const COLUMNS = [

    {
        Header:"BANNER",
        accessor:"mediaId",
        Cell: ({row})=>{       
        return <img src={row.original.mediaUrl} alt="trailer_img" style={{width:"100px",height:"100px"}}></img>}
    },
    {
        Header:"MOVIE",
        accessor:"title"
    },
    {
        Header:"RATING",
        accessor: 'userRating',
        Cell:({row})=>{
          return row.original.userRating && row.original.userRating.length !==0 ? ((row.original.userRating.reduce((a,b)=> (a*1+b*1))/4+row.original.imdb*1)/2).toFixed(1) : null
       }
    },
    {
        Header:"CATEGORY",
        accessor:"genre",
        Cell:({row})=>{
           return row.original.genre.map(item=>item + ' ')
        }
       
    },
    {
        Header:"VIEWS", 
        accessor:"description",
        Cell:({row})=>{
            return <span>{row.original.description && row.original.description.slice(0,40)}...</span>  }
    },
  //   {
  //       Header:"USER",
  //       accessor:"user",
  //       Cell:({row})=>{
  //         return <span>{row.original.firstname} {row.original.lastname}</span>  }
  //   },
    {
      Header:"DATE",
      accessor:"year"
  }
  
    
  ]
  
  