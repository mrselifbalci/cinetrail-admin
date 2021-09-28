export const COLUMNS = [
    {
            Header:"No",
            accessor:d=>d.index,
            id:"row",
            Cell:({row})=>{
                return<div>{row.index+1}</div>
            }
        },
        {
            Header:"AUTHOR",
            accessor:"userId",
            Cell:({row})=>{
                return row.original.userId[0] ? <span>{row.original.userId[0].firstname} {row.original.userId[0].lastname}</span> :null }        
        },
        {
            Header:"DESCRIPTION", 
            accessor:"content",
            Cell:({row})=>{
                return <span>{row.original.content && row.original.content.slice(0,41)}</span>  }
                // return <span>{row.original.content.length >40 .slice(0,40)}...</span>  }    ​
        },
        {
            Header:"STATUS",
            accessor:"isActive",
               Cell:({row})=>{
               return row.original.isActive === true ? <span>Active</span> : <span>Block</span>;
            }
        }
    ]