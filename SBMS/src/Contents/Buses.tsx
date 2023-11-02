import React, { useState, useEffect } from 'react';
import './Contents.css';

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    busId: '',
    busPlateNumber: '',
    capacity: '',
    busOwnerName: '',
    busOwnerTelephone: '',
    busOwnerEmail   : '',
    driverName: '',
    driverTelephone: '',
  });
  const [formVisible, setFormVisible] = useState(false);

  // Rest of your component remains the same...
  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit the form data to your Spring Boot backend here using fetch or Axios.
    fetch('http://localhost:8080/api/buses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., show a success message.
          console.log('Form submitted successfully');
          alert("Saved");
          location.reload();
        } else {
          // Handle errors, e.g., show an error message.
          console.error('Form submission failed');
          alert("Failed");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  useEffect(() => {
    // Fetch data from your Spring Boot application
    fetchData();
  }, []);
  
  // Replace the endpoint URL with the appropriate School API endpoint
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/buses'); // Replace with your API endpoint for schools
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } else {
        console.error('Error fetching data');
        alert('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    try {
      const response = await fetch('http://localhost:8080/api/buses'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        // Assuming the response data is an array of student objects with a 'name' property
  
        const filteredData = data.filter((item: any) =>
          item.firstName.toLowerCase().includes(searchTerm) || // Replace 'firstName' with the appropriate property
          item.lastName.toLowerCase().includes(searchTerm)    // Replace 'lastName' with the appropriate property
        );
        setFilteredData(filteredData);
        setCurrentPage(1);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (busId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/buses/${busId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert("Deleted");
        // Optionally, you can update your UI to reflect the deletion without reloading the entire page
      } else {
        alert("Error deleting bus");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update the table headers and data rendering for School
  return (
    <div>
       <div className='div4search'>
        <button className='toggleForm' onClick={toggleForm}> Add'Bus</button>
        <input
            type="text"
            className="search"
            placeholder="Search....."
            value={searchTerm}
            onChange={handleSearch}
          />
       </div>

       {formVisible && (
  <form onSubmit={handleSubmit}>
    <h2>Add Bus</h2>
    <input
      type="number"
      name="busId"
      placeholder="Bus ID"
      value={formData.busId}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="busPlateNumber"
      placeholder="Bus Plate Number"
      value={formData.busPlateNumber}
      onChange={handleInputChange}
    />
    <input
      type="number"
      name="capacity"
      placeholder="Capacity"
      value={formData.capacity}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="busOwnerName"
      placeholder="Bus Owner Name"
      value={formData.busOwnerName}
      onChange={handleInputChange}
    />
    <input
      type="tel"
      name="busOwnerTelephone"
      placeholder="Bus Owner Telephone"
      value={formData.busOwnerTelephone}
      onChange={handleInputChange}
    />
    <input
      type="email"
      name="busOwnerEmail"
      placeholder="Bus Owner Email"
      value={formData.busOwnerEmail}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="driverName"
      placeholder="Driver Name"
      value={formData.driverName}
      onChange={handleInputChange}
    />
    <input
      type="tel"
      name="driverTelephone"
      placeholder="Driver Telephone"
      value={formData.driverTelephone}
      onChange={handleInputChange}
    />
    
    <button type="submit" className="Submit">Submit</button>
  </form>
)}

      {/* Rest of your component code... */}
      <div>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Bus ID</th>
            <th>Bus Plate No.</th>
            <th>Carrier Capacity</th>
            <th>Owner Name</th>
            <th>Owner Phone No.</th>
            <th>Owner Email</th>
            <th>Driver Name</th>
            <th>Driver Phone No.</th>
            {/* Additional headers if needed */}
            <th>Action</th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {currentData.map((item) => (
            <tr key={item.busId}>
              <td>{item.busId}</td>
              <td>{item.busPlateNumber}</td>
              <td>{item.capacity}</td>
              <td>{item.busOwnerName}</td>
              <td>{item.busOwnerTelephone}</td>
              <td>{item.busOwnerEmail}</td>
              <td>{item.driverName}</td>
              <td>{item.driverTelephone}</td>
              {/* Additional data cells and actions */}
              <td>
                <button onClick={() => handleDelete(item.schoolId)} className="deletebtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Rest of your component code... */}
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={i + 1 === currentPage ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FormComponent;
