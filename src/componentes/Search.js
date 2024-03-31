import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Search (){
    
    const navigate = useNavigate();
     const submitHandler=(e)=>{
         e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if(keyword.length ===0 ){
            Swal.fire({
                title: "Oops...",
                text: "Tienes que escribir una palabra clave",
              });
        }if(keyword.length <3){
            Swal.fire({
                title:'oops..',
                text:'Tienes que escribir mas letras'
            })
        }else{
            e.currentTarget.keyword.value='';
            navigate(`/results?keyword=${keyword}`)            
        }

    }
    return (
        <>
        <form className="search d-flex" onSubmit={submitHandler}>
            <input type="text" name="keyword" className="form-control" id="exampleInputEmail1"  placeholder="buscar..."/>
            <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
        </>
    );
}
export default Search;