import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) =>{

  return(
    <div>

    
      <form>
        <div>
          filter shown with <input
          value={props.searchFilter}
          onChange={props.handleSearchFilter}
          />
        </div>

      </form>
    </div>

  )

}

const PersonForm = (props) => {
  const persons = props.persons
  const setPersons = props.setPersons
  const newName = props.newName
  const setNewName = props.setNewName
  const newNumber = props.newNumber
  const addPerson = props.addPerson
  const setNewNumber = props.setNewNumber
  const handleName = props.handleName
  const handleNumber = props.handleNumber
  
  return(
    <div>  

        <form onSubmit={addPerson}>

      <div>
        name: <input 
        value={newName}
        onChange={handleName}
        />
      </div>

      <div>
        number: <input 
        value={newNumber}
        onChange={handleNumber}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
    
    </div>
  )

}

const Persons = (props) => {
  
  const persons = props.showPersons().map(item => <li key={item.id}>{item.name} {item.number}<button onClick={()=> props.handleDelete(item)}>delete</button></li>)
  
  
  return(
    <div>
    {persons}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber
    }
    
    const nameCheck = persons.find(item => item.name === newName)
    console.log(nameCheck)
    if(nameCheck){
      if (persons.map(item => item.number).includes(newNumber) === false){
        if(confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          const updatedNumber = {
            name: nameCheck.name,
            number: newNumber,
            id: nameCheck.id
          }
          personService.update(nameCheck.id, updatedNumber).then(response => console.log(response))
          setNotification(`Updated ${nameCheck.name} with ${newNumber}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
        else{
          alert("information not updated")
        }
        
      }
      else{
        alert(`${newName} is already added to phonebook`)
      }
      

      
    } 
    else {
      personService
        .create(personsObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
        })
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${personsObject.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
        
    }
  }

  const showPersons = () => {
    if (searchFilter !== ''){
      const result = persons.filter(
      item => item.name.toLowerCase().includes(searchFilter.toLowerCase()))
      return(result)

    }
    else{
      const result = persons
      return(
      result
    )
    }

    }

    


  const handleName = (event) => {

    setNewName(event.target.value)

  }

  const handleNumber = (event) => {

    setNewNumber(event.target.value)
    
  }

  const handleSearchFilter = (event) => {
  
    setSearchFilter(event.target.value)
    
  }
  
  const handleDelete = (object) => {
    
    console.log(`handleDelete id ${object.id}`)
    personService
    .deletePerson(object.id)
    .then(response => {
      const deletedResult = persons.filter(item =>{
        
        return item.id !== object.id}
      )
      
      setPersons(deletedResult)
    })    
    .catch((error) =>{
      setNotification(`Information for ${object.name} has already been removed from the server`)
      setTimeout(() =>{
        setNotification(null)
      }, 5000)
    })

      
    }
      

    
    
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter       
      persons={persons}
      showPersons={showPersons}
      searchFilter={searchFilter}
      handleSearchFilter={handleSearchFilter}
      />

      <h3>Add a new</h3>

      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        addPerson={addPerson}
        handleName={handleName}
        handleNumber={handleNumber}

      />

      <h3>Numbers</h3>

      <Persons  
      persons={persons}
      showPersons={showPersons}
      searchFilter={searchFilter}
      handleSearchFilter={handleSearchFilter}
      handleDelete={handleDelete}
   
      />
    </div>
  )

 }
export default App