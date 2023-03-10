import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ProductTable(props) {
    let products = props.products;

    // Delete a Product
  const deleteProduct = async (id = 99) => {

    const response = await fetch(`http://localhost:3003/products/${id}`, {
      method: "DELETE",

    }).then(async (response) => {
      if (response.status == 200) {
        alert("Success! Product deleted");
      } else {
        alert("Error! Please try again.");
      }
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

            {
                products ?
                
                Object.entries(products).map(([key, prodduct])=>(
                
                    <tr key={key}>
                        <td>{(parseInt(key)+1)}</td>
                        <td>{prodduct.name}</td>
                        <td>{prodduct.category}</td>
                        <td>{prodduct.price}</td>
                        <td>
                            <Link  to={"/edit/"+prodduct._id}>  Edit </Link>
                          <Button variant="danger"  onClick={() => deleteProduct(prodduct._id)}>
                            Delete
                          </Button>
                        </td>
                    </tr>
                 
                ))
                : 
                <tr>
                    <td colSpan={4}><h1> Data Loading... </h1></td>
                </tr>
            }
                
               
                
            

      </tbody>
    </Table>
  );
}

export default ProductTable;