import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapsible from '../../components/Collapsible/Collapsible';

let endpoint = "http://localhost:9000";

const Forensics = () => {

  const [challenges, setChallenges] = useState([])
  const [activeIndex, setActiveIndex] = useState([])

  const updateState = (cname, name) => {
    const newState = activeIndex.map(obj => {
      if (obj.name === name && obj.cname === cname) {
        return { ...obj, active: !obj.active };
      }
      return obj;
    });

    setActiveIndex(newState)
  };
  const fetchChallenges = () => {
    axios.get(endpoint + "/api/forensic/challenges").then((res) => {
      if (res.data) {
        let value = res.data.Challenges
        let newState = []
        let len = value.length
        for (let i = 0; i < len; i++) {
          newState[i] = { cname: value[i].Name, name: value[i].Name, active: false }
        }
        for (let i = 0, x = len; i < len; i++) {
          Object.keys(value[i].Commands).forEach((subHead) => {
            newState[x] = { cname: value[i].Name, name: subHead, active: false }
            x = x + 1
            value[i].Commands[subHead].forEach((command) => {
              newState[x] = { cname: value[i].Name, name: command, active: false }
              x = x + 1
            })
          })
        }
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
            <Collapsible props={challenge} key={index} index={activeIndex} setActive={updateState} />
          );
        })
      }
    </div>
  )
}

export default Forensics