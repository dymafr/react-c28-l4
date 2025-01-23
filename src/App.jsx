import React, { useActionState, useOptimistic, useState } from "react";
import { wait } from "./utils";

function Form({ name, setName }) {
  const [nameOptimistic, setNameOptimistic] = useOptimistic(name);
  const [error, submitAction, isPending] = useActionState(
    async (oldState, formData) => {
      try {
        const newName = formData.get("name");
        setNameOptimistic(newName); 
        const res = await wait(3000, true); 
        setName(newName); 
        return null;
      } catch (e) {
        return e;
      }
    }
  );

  return (
    <form action={submitAction} className="p-20">
      <h1>Nom : {nameOptimistic}</h1>
      <div className="mb-20">
        <input
          defaultValue={name}
          type="text"
          placeholder="name"
          name="name"
        />
        {error && <p>{error}</p>}
      </div>
      <button disabled={isPending} className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

function App() {
  const [name, setName] = useState("Louis");
  return <Form name={name} setName={setName} />;
}

export default App;
