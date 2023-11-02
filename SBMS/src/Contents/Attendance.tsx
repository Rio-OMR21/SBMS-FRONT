import React, { useState, useEffect } from 'react';
import './Contents.css';


const FormComponent: React.FC = () => {

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
      const response = await fetch('http://localhost:8080/api/attendance'); // Replace with your API endpoint for schools
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
      const response = await fetch('http://localhost:8080/api/attendance'); // Replace with your API endpoint
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

  
  return (
    <div>
       <div className='div4search'>
        <input
            type="text"
            className="search"
            placeholder="Search....."
            value={searchTerm}
            onChange={handleSearch}
          />
       </div>

      <div>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Attendance ID</th>
            <th>Student ID</th>
            <th>Bus ID</th>
            <th>Date</th>
            <th>Home Depature Time</th>
            <th>School Arrival Time</th>
            <th>School Depature Time</th>
            <th>Home Arrival Time</th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {currentData.map((item) => (
            <tr key={item.attendanceId}>
              <td>{item.student}</td>
              <td>{item.bus}</td>
              <td>{item.date}</td>
              <td>{item.homeDepartureTime}</td>
              <td>{item.schoolArrivalTime}</td>
              <td>{item.schoolDepartureTime}</td>
              <td>{item.homeArrivalTime}</td>
              
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
