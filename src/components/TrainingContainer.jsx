
import Dashboard from "./Training/Dashboard"
import RequestTable from "./Training/RequestTable"
import TrainingHeaderBtn from "./Training/TrainingHeaderBtn"

const TrainingContainer = () => {
  const styles = {
    mainContent:{
      flex:'auto',
      // overflowY:'auto',
      // height: '100vh', // Ensure the container takes the full height of the viewport
      boxSizing: 'border-box' ,
      padding: '10px 10px 0 0',
      // width: 'calc(100% - 280px)',
      marginLeft: '240px',
      marginright: '0',
      maxHeight: '100vh',
      maxWidth: '100%',
      // minHeight: '100vh',
    }
  }
  const role = "CapDev";
  return (
    <div style={styles.mainContent}>
<TrainingHeaderBtn></TrainingHeaderBtn>
<RequestTable role={role}></RequestTable>
      <Dashboard></Dashboard>
    </div>
  )
}

export default TrainingContainer
