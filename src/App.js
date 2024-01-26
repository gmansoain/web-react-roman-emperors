import { useState } from "react";

const dynasties = [
  "Julio-Claudian",
  "Year of the Four EmperorsList",
  "Flavian",
  "Nerva-Antonine",
];

// const emperorsData = [
//   {
//     id: 1,
//     name: "Augustus",
//     reign_start: "27 BC",
//     reign_end: "14 AD",
//     birth_date: "September 23, 63 BC",
//     death_date: "August 19, 14 AD",
//     dynasty: "Julio-Claudian",
//     other_titles: "Imperator Caesar Divi Filius Augustus",
//     biography:
//       "Augustus was the first Roman emperor, ruling from 27 BC until his death in 14 AD. He was the founder of the Roman Principate and the first ruler of the Julio-Claudian dynasty.",
//   },
//   {
//     id: 5,
//     name: "Nero",
//     reign_start: "October 13, 54 AD",
//     reign_end: "June 9, 68 AD",
//     birth_date: "December 15, 37 AD",
//     death_date: "June 9, 68 AD",
//     dynasty: "Julio-Claudian",
//     other_titles: "Nero Claudius Caesar Augustus Germanicus",
//     biography:
//       "Nero was the fifth Roman emperor, ruling from 54 AD until his death in 68 AD. His reign was marked by extravagance and persecution of Christians.",
//   },
// ];

const emperors = await getEmperors();
async function getEmperors() {
  const res = await fetch(
    "https://roman-emperors-api-dev-du0yyx.a671fi.gbr-e1.cloudhub.io/api/emperors"
  );
  const data = await res.json();
  console.log(data);
  return data;
}

async function createEmperor(newEmperor) {
  const res = await fetch(
    "https://roman-emperors-api-dev-du0yyx.a671fi.gbr-e1.cloudhub.io/api/emperors",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmperor),
    }
  );
  const data = await res.json();
  console.log(data);
}

function App() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <Header setShowForm={setShowForm} showForm={showForm} />
      {showForm && <FormAddEmperor setShowForm={setShowForm} />}

      <div className="main">
        <DynastiesList />
        <EmperorsList />
      </div>
    </div>
  );
}

function Header({ setShowForm, showForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="images/spqr_logo.png" />
        <h1>Roman Emperors by Gon</h1>
      </div>
      <button className="btn" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Add Emperor"}
      </button>
    </header>
  );
}

function FormAddEmperor({ setShowForm }) {
  const [emperorName, setEmperorName] = useState("");
  const [title, setTitle] = useState("");
  const [reignStart, setReignStart] = useState("");
  const [reignEnd, setReignEnd] = useState("");
  const [dynasty, setDynasty] = useState("");
  const [biography, setBiography] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newEmperor = {
      name: emperorName,
      birth_date: "unknown",
      death_date: "unknown",
      other_titles: title,
      reign_start: reignStart,
      reign_end: reignEnd,
      dynasty,
      biography,
    };
    console.log(newEmperor);
    createEmperor(newEmperor);
    setShowForm(false);
  }
  return (
    <form className="form-add-emperor" onSubmit={handleSubmit}>
      <label>Emperor Name</label>
      <input
        type="text"
        value={emperorName}
        onChange={(e) => setEmperorName(e.target.value)}
      />

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Reign Start</label>
      <input
        type="text"
        value={reignStart}
        onChange={(e) => setReignStart(e.target.value)}
      />

      <label>Reign End</label>
      <input
        type="text"
        value={reignEnd}
        onChange={(e) => setReignEnd(e.target.value)}
      />

      <select value={dynasty} onChange={(e) => setDynasty(e.target.value)}>
        <option>(Dynasty)</option>
        <option>Julio-Claudian</option>
        <option>Nerva-Antonine</option>
      </select>

      <label>Biography</label>
      <textarea
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
      ></textarea>
      <button className="btn">Add</button>
    </form>
  );
}

function DynastiesList() {
  return (
    <ul className="dynasties-list">
      {dynasties.map((dynasty) => (
        <li>{dynasty}</li>
      ))}
    </ul>
  );
}

function EmperorsList() {
  return (
    <ul className="emperors-list">
      {emperors.map((emperor) => (
        <EmperorItem emperor={emperor} />
      ))}
    </ul>
  );
}

function EmperorItem({ emperor }) {
  return (
    <li className="emperor">
      <div className="emperor-title">
        <div className="emperor-name">
          <span>#{emperor.id}</span>
          <h2>{emperor.name}</h2>
        </div>
        <span className="reign">
          {emperor.reign_start} - {emperor.reign_end}
        </span>
      </div>

      <p className="emperor-other-title">{emperor.other_titles}</p>
      <p className="emperor-biography">{emperor.biography}</p>
      <div className="tags">
        <div></div>
        <span>{emperor.dynasty}</span>
      </div>
    </li>
  );
}

export default App;
