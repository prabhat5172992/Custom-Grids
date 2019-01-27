
function SortAlphaNum(a,b,sortDirection){
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var aA, bA, aN, bN;
    if(sortDirection === "ASC"){
        if(typeof(a)==="string" && typeof(b)==="string"){
            aA = a.replace(reA, "");
            bA = b.replace(reA, "");
            if(aA === bA){
                aN = parseInt(a.replace(reN, ""), 10);
                bN = parseInt(b.replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? 1 : -1
            }else {
                return aA > bA ? 1 : -1;
            }
        }
        else return a > b ? 1 : -1;
    }
    else if(sortDirection === "DESC"){
        if(typeof(a)==="string" && typeof(b)==="string"){
            aA = a.replace(reA, "");
            bA = b.replace(reA, "");
            if(aA === bA){
                aN = parseInt(a.replace(reN, ""), 10);
                bN = parseInt(b.replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? -1 : 1
            }else {
                return aA > bA ? -1 : 1;
            }
        }
        else return a > b ? -1 : 1;
    }
}

function doSort(sortColumn, sortDirection, rows){ 
    const comparer = function(a,b){
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      if(sortDirection==="ASC"){
        return SortAlphaNum(aVal, bVal, sortDirection);
      }
      else if(sortDirection==="DESC"){
        return SortAlphaNum(aVal, bVal, sortDirection);
      }
    };
    return rows.sort(comparer);
}

// function setTimeout(){

// }

// function setTimeout(){
    
// }, timeout);

export {doSort};