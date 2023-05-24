import { useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';

const customerList = [
  {id: 1, name: 'Praveen Goswami', email: 'lorememail@email.com', orders: 46 },
  {id: 2, name: 'Ghanisht Khurana', email: 'lorememail@email.com', orders: 46 },
  {id: 3, name: 'Ram Kumar', email: 'lorememail@email.com', orders: 0 },
  {id: 4, name: 'Dimple Sharma', email: 'myemail123@gmail.com', orders: 46 },
  {id: 5, name: 'Akshay Kumar', email: 'lorememail@email.com', orders: 46 },
  {id: 6, name: 'Salman Khan', email: 'lorememail@email.com', orders: 46 },
  {id: 7, name: 'Shahrukh Khan', email: 'lorememail@email.com', orders: 46 },
  {id: 8, name: 'Kapil Sharma', email: 'randomemail@email.com', orders: 0 },
  {id: 9, name: 'Rohit Shetty', email: 'lorememail@email.com', orders: 46 },
  {id: 10, name: 'Bobby Deol', email: 'lorememail@email.com', orders: 46 },
  {id: 11, name: 'Amir Khan', email: 'lorememail@email.com', orders: 46 },
  {id: 12, name: 'Ayushmaan Khurana', email: 'youremail@email.com', orders: 46 },
  {id: 13, name: 'Katrina Kaif', email: 'lorememail@email.com', orders: 46 },
  {id: 14, name: 'Rajkumar Rao', email: 'lorememail@email.com', orders: 0 },
  {id: 15, name: 'Sushant Singh Rajput', email: 'lorememail@email.com', orders: 46 },
  {id: 16, name: 'Kangana Ranaut', email: 'xxxemail@email.com', orders: 46 },
]

function MultiSelectComboBox() {
  const [showOptions, setShowOptions] = useState(false); 
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleCustomerSelect = (customer) => {
    const isCustomerSelected = selectedCustomers.includes(customer);

    if (isCustomerSelected) {
      const updatedCustomers = selectedCustomers.filter((selectedCustomer) => {
        return selectedCustomer !== customer;
      })
      setSelectedCustomers(updatedCustomers);
    } else {
      setSelectedCustomers([...selectedCustomers, customer])
    }
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSearchInput(event.target.value);
  }

  const filteredCustomers =
    query === ''
      ? customerList
      : customerList.filter((customer) =>
          (customer.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
            ||
            customer.email
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
          )
        )

  return (
  <div className="relative w-[450px]">
    <div className='relative w-full'>
      <input 
        type="text"
        value={showOptions ? searchInput : `${selectedCustomers.length} customers selected`} 
        onChange={handleInputChange} 
        className="w-full p-4 shadow-sm rounded-lg focus:outline-none"
        placeholder='Search name, email,...etc'
        readOnly={!showOptions}
      />
      <div className='absolute top-[50%] translate-y-[-50%] right-5'>
        <BsFillCaretDownFill
          onClick={() => setShowOptions(!showOptions)} 
          className='text-gray-500 text-xl cursor-pointer'
        />
      </div>
    </div>
    {
      showOptions &&
      <div className="mt-1 absolute regular w-full bg-white max-h-96 overflow-auto flex flex-col gap-3 z-10 px-2 py-4 rounded-lg shadow-xl">
        {
          filteredCustomers.length === 0
          ? 'No matches Found'
          : filteredCustomers.map((customer) => {
            return (
                <div className='flex flex-row justify-between' key={customer.id}>
                  <div className="flex justify-start items-center gap-3"> 
                    <div className="bg-[#7D7B86] w-8 h-8 rounded-full overflow-hidden flex justify-center items-center text-white text-xs">
                      {customer.name.charAt(0)}
                    </div>
                    <div className='flex flex-col'>
                      <p className="text-gray-600 text-sm">{customer.name}</p>
                      <p className="text-gray-400 text-xs">{customer.email}</p>
                    </div> 
                  </div>
                  <div className='flex items-center justify-between gap-4'>
                      <p className='text-gray-600 text-sm semibold'>{customer.orders} <span className='text-xs text-gray-400'>orders</span></p>
                      <input 
                        type='checkbox'
                        checked={selectedCustomers.includes(customer)}
                        onChange={() => handleCustomerSelect(customer)}
                        className='cursor-pointer'
                      />
                  </div>
              </div>
            )
          })
        }
      </div>
    }
    
  </div>
  )
}
                      
                   

export default MultiSelectComboBox;