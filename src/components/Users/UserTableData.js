export const COLUMNS = [

    {
        Header:"PROFILE",
        accessor:"mediaId",
        Cell: ({row})=>{       
        return <img src={row.original.mediaId[0].url} alt="profile_img" style={{width:"100px",height:"100px",borderRadius:"4px"}}></img>}
    },
    {
        Header:"NAME",
        accessor:"user",
        Cell:({row})=>{
            return <span>{row.original.firstname} {row.original.lastname}</span>  }
    
    },  
    {
        Header:"EMAIL",
        accessor:"email",
        Cell:({row})=>{
            return row.original.email.slice(0,1).toUpperCase() + row.original.email.slice(1)
         }
    },
    {
        Header:"COUNTRY",
        accessor:"country",
        Cell:({row})=>{
           return row.original.country ? row.original.country : "NA"
        } 
    },
    {
        Header:"STATUS",
        accessor:"isActive",
        Cell:({row})=>{
            return row.original.isActive === true ? <span>Active</span> : <span>Block</span>
        }
    },
    {
        Header:"ROLE",
        accessor:"role",
        Cell:({row})=>{
            return row.original.role === 'user' ? <span>User</span> : row.original.role === 'admin' ? <span>Admin</span> : <span>Super Admin</span>
        }
    },
    {
        Header:"JOIN DATE", 
        accessor:"createdAt",
          Cell:({row})=>{
           return <span>{row.original.createdAt.slice(0,10)}</span>
        }
    }
    
]