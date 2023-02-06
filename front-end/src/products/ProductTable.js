import Table from 'react-bootstrap/Table';

function ProductTable(props) {
    let products = props.products;

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
                        <td>Edit</td>
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