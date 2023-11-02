import React, { useState, useEffect } from 'react';
import './Contents.css'; 


const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({studentId:'', schoolId:'', firstName:'', middleName:'', lastName:'', gender:'',
    classGrade:'', homeStreetAddress:'', parentFirstName:'', parentMiddleName:'',
    parentLastName:'', parentTelephone:'', parentEmail :''});
  const [formVisible, setFormVisible] = useState(false);

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
    fetch('http://localhost:8080/api/students', {
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/students' // Replace with your API endpoint
      );
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } else {
        console.error('Error fetching data');
        alert("Error fetching data");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    try {
      const response = await fetch('http://localhost:8080/api/students'); // Replace with your API endpoint
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

  const handleDelete = async (studentId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert("Deleted");
        // Optionally, you can update your UI to reflect the deletion without reloading the entire page
      } else {
        alert("Error deleting student");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div>
      <div className='div4search'>
      <button className='toggleForm' onClick={toggleForm}> Add'Student</button>
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
          <h2>Add Student</h2>
          <input
            type="number"
            name="studentId"
            placeholder="New Student ID"
            value={formData.studentId}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="schoolId"
            placeholder="School ID"
            value={formData.schoolId}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First-Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle-Name"
            value={formData.middleName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last-Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="classGrade"
            placeholder="Class/Grade"
            value={formData.classGrade}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="homeStreetAddress"
            placeholder="Home Street Address"
            value={formData.homeStreetAddress}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="parentFirstName"
            placeholder="Parent First Name"
            value={formData.parentFirstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="parentMiddleName"
            placeholder="Parent Middle Name"
            value={formData.parentMiddleName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="parentLastName"
            placeholder="Parent Last Name"
            value={formData.parentLastName}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="parentTelephone"
            placeholder="Parent Mobile phone"
            value={formData.parentTelephone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="parentEmail"
            placeholder="Parent Email"
            value={formData.parentEmail}
            onChange={handleInputChange}
          />
          
          <button type="submit" className="Submit">Submit</button>
        </form>
      )}

      <div>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Student ID</th>
            <th>School ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Class/ Grade</th>
            <th>Home address</th>
            <th>Parent F Name</th>
            <th>Parent M Name</th>
            <th>Parent L Name</th>
            <th>Parent Mobile</th>
            <th>Parent Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {currentData.map((item) => (
            <tr key={item.studentId}>
              <td>{item.studentId}</td>
              <td>{item.school}</td>
              <td>{item.firstName}</td>
              <td>{item.middleName}</td>
              <td>{item.lastName}</td>
              <td>{item.gender}</td>
              <td>{item.classGrade}</td>
              <td>{item.homeStreetAddress}</td>
              <td>{item.parentFirstName}</td>
              <td>{item.parentMiddleName}</td>
              <td>{item.parentLastName}</td>
              <td>{item.parentTelephone}</td>
              <td>{item.parentEmail}</td>
              <td>
                <button onClick={()=> handleDelete(item.studentId)} className="deletebtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
