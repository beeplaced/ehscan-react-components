import ExtButton from "../components/ExtButton";

const App = () => {

        const doStuff = () => {
    console.log("doStuff")
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ehscan Components Demo</h1>

      <ExtButton index={'mainBtn'} text="asdad" click={() => doStuff()}>
      <svg width="24" height="24">
        <circle cx="12" cy="12" r="10" fill="red" />
      </svg>
        </ExtButton>
      </div>

      )


}

export default App