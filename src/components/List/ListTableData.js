
export const COLUMNS = [

    {
        Header:"USER",
        accessor:"userId",
        Cell: ({row})=>{       
            return row.original.userId[0] ? <span>{row.original.userId[0].firstname} {row.original.userId[0].lastname}</span> :null } 
    },
    {
        Header:"LIST NAME",
        accessor:"name"
    },
    {
        Header:"DESCRIPTION", 
        accessor:"description",
        Cell:({row})=>{
            return <span>{row.original.description && row.original.description.slice(0,40)}...</span>  }
    },
    {
        Header:"MOVIES",
        accessor:"movieIds",
        Cell: ({row})=>{       
            return row.original.movieIds.length+' movies'
         }
    },
    {
        Header:"RATING",
        accessor:"rating",
        
    },
    {
        Header:"USER RATINGS", 
        accessor:"userRatingIds",
        Cell:({row})=>{
            return row.original.userRatingIds.length !==0 ? (row.original.userRatingIds.reduce((total,item)=> total+item.rating,0)/row.original.userRatingIds.length).toFixed(1):null
         }
    },
    
    {
        Header:"PRIVACY",
        accessor:"isPublic",
        Cell: ({row})=>{       
            return <span>{row.original.isPublic === true? 'PUBLIC' : 'PRIVATE'}</span>  

         }
    },
    {
        Header:"STATUS",
        accessor:"isActive",
           Cell:({row})=>{
           return row.original.isActive === true ? <span>Active</span> : <span>Block</span>;
        }
    },
   

    
]

