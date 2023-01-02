const Course = ({courses}) => {
    return (
        <div>
          {courses.map(course =>
            <div key={course.id}>
              <Header text={course.name}/>
              <Content parts={course.parts}/>
              <Total parts={course.parts}/>
            </div>
          )}
        </div>
    )
  }
  
const Header = ({text}) => <h1>{text}</h1>
  
const Content = ({parts}) => 
    <div>
        {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
    </div>
  
const Part = ({part, exercises}) => <p>{part} {exercises}</p>
  
const Total = ({parts}) => {
    const total = parts.reduce((s, p) => console.log('what is happening', s, p) || s + p.exercises, 0)

    return (
    <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
    )
}

export default Course