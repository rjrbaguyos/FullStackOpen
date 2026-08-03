const Course = ({courses}) => {
    const initialValue = 0
    const ex = courses.map(course => (
        course.parts.map(part => part.exercises)
        
    ))
    console.log(ex)
   
    return(
        <div>
        {courses.map(course => 
            (<div key={course.id}>
            <h2>{course.name}</h2>

            {course.parts.map(part => 
            <li key={part.id}>{part.name} {part.exercises}</li>)}

            <b>{course.parts.map(part => part.exercises).reduce((s,p) => s+p, initialValue)}</b>

            
        
        </div>


        ))}
        </div>
    )

            
       
        
    
}
export default Course