import {useUser} from '@auth0/nextjs-auth0/client';
import {useMutation} from 'react-query';
import {useRouter} from 'next/router';
import {useCallback} from 'react'

let firstRun = true;
async function createUserRequest(userData) {

    const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({user: userData})
   };
   try {
    const response = await fetch("/api/users/create", settings);
    const data = await response.json();
    return data;
   } catch(e) {
      console.error(e);
      return e;
   }
  }
  async function createLevelRequest(levelData) {
    console.log('creating level')
    console.log(JSON.stringify({level: levelData}))
    const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({level: levelData})
    /*
    {
      "level": {
      "userEmail": "giggitygoo@gmail.com",
      "isNew": false,
      "numCorrect": 5,
      "firstProbCorrect": false,
      "secondProbCorrect": true,
      "thirdProbCorrect": false,
      "fourthProbCorrect": true,
      "fifthProbCorrect": false,
      "sixthProbCorrect": true,
      "seventhProbCorrect": false
      }
    }
    */
   };
   try {
    const response = await fetch("/api/levels/create", settings);
    const data = await response.json();
    return data;
   } catch(e) {
      console.error(e);
      return e;
   }
  }

    function DatabaseQuery() {

    const router = useRouter();
    const {user} = useUser();
    var axios = require("axios").default;
    const mutation = useMutation(createUserRequest); 
    const levMutation = useMutation(createLevelRequest);
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdSUDNwMjNoc1dKSXZ0ZGF0akM5ViJ9.eyJpc3MiOiJodHRwczovL2Rldi0yZXI3bDV0dW5tMjF3Z2IwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ5eHVTYlhaU3FIa1k2YVdEeHExdWx2a0s3aE0zQmhMeEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtMmVyN2w1dHVubTIxd2diMC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4MTQwNjkwNywiZXhwIjoxNjgxNDkzMzA3LCJhenAiOiJ5eHVTYlhaU3FIa1k2YVdEeHExdWx2a0s3aE0zQmhMeCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Fza_W94pdmRXMU9gigijuV2n4AVHnkQPb60jK4cO-e2Aq25bvGVvhINqZdceCfqsBd_K0XZwa0hklUcd4B1IUwO0bUFNRHj6QJJxnKu8qNKTPoVs8sS01a6xIEnf47KyPsfUXCQigsER1_9tE3s7d5hqFpLFZlFHRtXwEPYGe-sYqP41KkHogHtWRbC6Qbwckxmh5zDmOmPBlmSHkqyyfnatFvPDKldXTVEoisD9uZN2yleOUbEvxayI77oYGP6i6fCqzbC6ACWS9-nSI2n-U5BL7dZ3EEK_z9h9CcUbVy05ERR6kX-uJutt8aLtJ26bu_-zQQ47RHQW4Xb6KHdGYw";
    let oneRun = true;

    // const newUserSec = () => {
      
    // }

    const onNewUser = () => {

        if (typeof window !== 'undefined') {
          console.log('not undefined')
          if(localStorage.getItem('level') !== null ) {
            console.log('test completed')
            const level = JSON.parse(localStorage.getItem('level'));
            console.log(level[1])
            levMutation.mutate({
              userEmail: user.email,
              isNew: false,
              numCorrect: level[1],
              firstProbCorrect: level[2][0],
              secondProbCorrect: level[2][1],
              thirdProbCorrect: level[2][2],
              fourthProbCorrect: level[2][3],
              fifthProbCorrect: level[2][4],
              sixthProbCorrect: level[2][5],
              seventhProbCorrect: level[2][6],
            })
            console.log('creating da user twice?')
            //split into two different functions
            // mutation.mutate({
            //   email: user.email,
            // })
          }
          else {
            console.log('new')
            levMutation.mutate({
              userEmail: user.email,
              isNew: true,
              numCorrect: 0,
              firstProbCorrect: false,
              secondProbCorrect: false,
              thirdProbCorrect: false,
              fourthProbCorrect: false,
              fifthProbCorrect: false,
              sixthProbCorrect: false,
              seventhProbCorrect: false,
            })

          }
        }
        else {
          console.log('cannot get localstorage');
        }

        console.log('has attempted user creation')

        if (oneRun) {
          oneRun=false;
          mutation.mutate({
          email: user.email,
          })
        }
      }

    if(user) {
    var options = {
      method: 'GET',
      url: `https://dev-2er7l5tunm21wgb0.us.auth0.com/api/v2/users/${user.sub}`,
      headers: {authorization: `Bearer ${token}`}
    };

    axios.request(options).then(function (response) {
        if(firstRun) {
        firstRun=false;
        const loginCount = response.data.logins_count;
        if(loginCount===1) {
        onNewUser();
        router.push('/dashboard');
      }
      else {
        router.push("/dashboard");
      }
    }
    }).catch(function (error) {
      console.error(error);
    });
    }

}

export default DatabaseQuery;
