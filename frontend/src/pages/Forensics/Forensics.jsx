import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapsible from '../../components/Collapsible/Collapsible';

let endpoint = "http://localhost:9000";

const Forensics = () => {

  const [challenges, setChallenges] = useState([])
  const [activeIndex, setActiveIndex] = useState([])
  const [output, setOutput] = useState([])
  let newCmd = ""
  const editValue = (val) => {
    newCmd = val
  }

  const updateState = (cname, name) => {

    let dir = 'files/Forensics/' + cname

    console.log(newCmd)

    const loadingTrue = activeIndex.map(obj => {
      if (obj.name === name && obj.cname === cname) {
        return { ...obj, active: !obj.active };
      }
      return obj;
    });

    const loadingFalse = loadingTrue.map(obj => {
      if (obj.name === name && obj.cname === cname) {
        return { ...obj, active: !obj.active };
      }
      return obj;
    });

    loadingTrue.forEach(obj => {
      if (obj.name === name && obj.cname === cname) {
        if ('code' in obj && obj.active) {
          fetchOutput(newCmd ? newCmd : name, dir).then(res => {
            setOutput(output.map(ob => {
              if (ob.name === name) {
                return { ...ob, value: res.data.Value };
              }
              return ob
            }))
            setActiveIndex(loadingFalse)
          })
        }
      }
    })

    setActiveIndex(loadingTrue)
  };

  const fetchOutput = async (cmd, dir) => {
    let lis = cmd.split(" ")
    let command = lis[0]
    let argument = lis.splice(1)

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    let params = {
      "Command": command,
      "Arguments": argument,
      "Directory": dir
    }

    let data = JSON.stringify(params)

    return await axios.post(endpoint + "/api/forensic/run", data, config)
  }


  const fetchChallenges = () => {
    axios.get(endpoint + "/api/forensic/challenges").then((res) => {
      if (res.data) {
        let value = res.data.Challenges
        let newState = []
        let initOp = []
        let len = value.length
        for (let i = 0; i < len; i++) {
          newState.push({ cname: value[i].Name, name: value[i].Name, active: false })
        }
        for (let i = 0; i < len; i++) {
          Object.keys(value[i].Commands).forEach((subHead) => {
            if (subHead === "Change Directory") return
            newState.push({ cname: value[i].Name, name: subHead, active: false })
            value[i].Commands[subHead].forEach((command) => {
              newState.push({ cname: value[i].Name, name: command, active: false, code: true })
              initOp.push({ name: command, value: "" })
            })
          })
        }
        // console.log(newState)
        // console.log(initOp)
        setOutput(initOp)
        setChallenges(value)
        setActiveIndex(newState)
      } else {
        console.log("No Challenges Found");
      }
    })
  }

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div>
      <h1>Forensics</h1>
      {
        challenges.map((challenge, index) => {
          return (
            <Collapsible
              props={challenge}
              key={index}
              index={activeIndex}
              setActive={updateState}
              setEdit={editValue}
              output={output}
            />
          );
        })
      }
    </div>
  )
}

export default Forensics