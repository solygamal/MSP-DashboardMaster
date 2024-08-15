function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}
function EditToggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popupp = document.getElementById('popupp');
    popupp.classList.toggle('active');
} 




// GET API
// document.addEventListener('DOMContentLoaded', (event) => {
    // function getTeam() {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Authorization", localStorage.getItem("token"));

    //     const requestOptions = {
    //         method: "GET",
    //         headers: myHeaders,
    //         redirect: "follow"
    //     };

    //     fetch("http://164.92.244.59:3000/dashboard/teams/get?page=1&limit=11", requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             const teamCardsContainer = document.getElementById('teams-cards');
    //             if (!teamCardsContainer) {
    //                 console.error('Element with ID "teams-cards" not found');
    //                 return;
    //             }

    //             const addNewCardHTML = `
    //                 <div class="card-add" id="searchButton">
    //                     <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;" onclick="toggle()"></i>
    //                     <h5>Add New dash</h5>
    //                 </div>
    //             `; 

    //             // Clear any existing cards except the add new card
    //             teamCardsContainer.innerHTML = addNewCardHTML;

    //             data["results"].forEach(member => {
    //                 teamCardsContainer.innerHTML += `
    //                      <div class="card1">
    //       <div class="image">
    //         <img src="${member.image}" alt="">
    //          </div>
    //         <div class="text">
    //           <h4>${member.name}</h4>
    //           <p>${member.track}</p>
    //           <p class="delet" onclick="deleteCard('${member._id}')">Delete</p>
    //           </div>
    //           <div class="icon" onclick="EditToggle('${member._id}')" style="margin-left=30px">
    //             <i class="fa-solid fa-pen" style="color: #000000;"></i>
    //             <p style="padding-left:px;">Edit Profile</p>
    //       </div>
    //     </div>
    //                 `;
    //             });
    //         })
    //         .catch(error => console.error('Error:', error));
    // }

    // getTeam();

// });



// GET API
let currentPage = 1;
const limit = 11;

function getTeam(page = 1) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://164.92.244.59:3000/dashboard/teams/get?page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const teamCardsContainer = document.getElementById('teams-cards');
            if (!teamCardsContainer) {
                console.error('Element with ID "teams-cards" not found');
                return;
            }

            const addNewCardHTML = `
                <div class="card-add" id="searchButton">
                    <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;" onclick="toggle()"></i>
                    <h5>Add New dash</h5>
                </div>
            `; 

            // Clear any existing cards except the add new card
            teamCardsContainer.innerHTML = addNewCardHTML;

            data["results"].forEach(member => {
                teamCardsContainer.innerHTML += `
                    <div class="card1">
                        <div class="image">
                            <img src="${member.image}" alt="">
                        </div>
                        <div class="text">
                            <h4>${member.name}</h4>
                            <p>${member.track}</p>
                            <p class="delet" onclick="deleteCard('${member._id}')">Delete</p>
                        </div>
                        <div class="icon" onclick="EditToggle('${member._id}')" style="margin-left=30px">
                            <i class="fa-solid fa-pen" style="color: #000000;"></i>
                            <p style="padding-left:px;">Edit Profile</p>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('nextteam').addEventListener('click', () => {
    currentPage++;
    getTeam(currentPage);
});

document.getElementById('previousteam').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getTeam();
    }
});

getTeam(currentPage);



// Delete API
function deleteCard(cardId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization",localStorage.getItem("token") );
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
  
    fetch(`http://164.92.244.59:3000/dashboard/teams/delete/${cardId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const cardElement = document.getElementById(`card${cardId}`);
        if (cardElement) {
          cardElement.remove();
        }
        getTeam();
    })
    .catch((error) => console.error(error));
}
// END Delete Api


// POST API
document.getElementById('add').addEventListener('click', function() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization",localStorage.getItem("token")  );

    const formdata = new FormData();
    formdata.append("name", document.getElementById('text').value);
    formdata.append("phone", document.getElementById('phone').value);
    formdata.append("track", document.getElementById('track').value);
    formdata.append("linkedin", document.getElementById('link').value);
    formdata.append("facebook", document.getElementById('face').value);
    formdata.append("behanceOrGithub", document.getElementById('git').value);
    formdata.append("linktree", document.getElementById('linktree').value);
    
    const fileInput = document.getElementById('image-upload');
    if (fileInput.files.length > 0) {
        formdata.append("image", fileInput.files[0]);
    }

    formdata.append("description", document.getElementById('textarea').value);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("http://164.92.244.59:3000/dashboard/teams/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            getTeam();
        })
        .catch(error => console.error('Error:', error));
        toggle()
});



// document.addEventListener('DOMContentLoaded', function() {
//     fetch('http://164.92.244.59:3000/dashboard/teams/edit/66bcef6094941c8ef52982a8')
//       .then(response => response.json())
//       .then(data => {
//         // document.getElementById('textt').value = data.name;
//         // document.getElementById('phonee').value = data.phone;
//         // document.getElementById('trackk').value = data.track;
//         // document.getElementById('linkk').value = data.linkedin;
//         // document.getElementById('facee').value = data.facebook;
//         // document.getElementById('gitt').value = data.behanceOrGithub;
//         // document.getElementById('linktreee').value = data.linktree;
//         // document.getElementById('textareaa').value = data.description;
//         // document.getElementById('image-upload-Edit').setAttribute('data-current-image', data.image);
//       })
//       .catch(error => console.error('Error loading data:', error));
//   });

//   Edit API
  document.getElementById('addd').addEventListener('click', function(event) {
    event.preventDefault(); 
 
    const myHeaders = new Headers();
    myHeaders.append("Authorization",localStorage.getItem("token")  );
  
    const formData = new FormData();
    formData.append("name", document.getElementById('textt').value);
    formData.append("phone", document.getElementById('phonee').value);
    formData.append("track", document.getElementById('trackk').value);
    formData.append("linkedin", document.getElementById('linkk').value);
    formData.append("facebook", document.getElementById('facee').value);
    formData.append("behanceOrGithub", document.getElementById('gitt').value);
    formData.append("linktree", document.getElementById('linktreee').value);
    formData.append("description", document.getElementById('textareaa').value);
  
    const fileInput = document.getElementById('image-upload-Edit');
    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    } else {
      // If no new image, use existing one
      formData.append("image", document.getElementById('image-upload-Edit').getAttribute('data-current-image'));
    }
  
    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };
  
    fetch('http://164.92.244.59:3000/dashboard/teams/edit/66bd383c94941c8ef52985d8', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        getTeam();
    })
      .catch(error => console.error('Error updating data:', error));
      EditToggle()
  });






  // ADD Button Upload on popup 
let btnUpload = document.querySelector("#image-upload");
let txtFile = document.querySelector("#txtFile")
btnUpload.addEventListener('change', ()=>{
    console.log(btnUpload.value.toString());
    txtFile.innerHTML = `${(btnUpload.value.toString()).slice(12,21)}<span style="color:#7B1D80 !important;">..${(btnUpload.value.toString()).slice(-4)}</span>` 
});

// Edit Button Upload on popup 
let btnUploadEdit = document.querySelector("#image-upload-Edit");
let txtFileEdit = document.querySelector("#txtFile-Edit")
btnUploadEdit.addEventListener('change', ()=>{
    console.log(btnUploadEdit.value.toString());
    txtFileEdit.innerHTML = `${(btnUploadEdit.value.toString()).slice(12,21)}<span style="color:#7B1D80 !important;">..${(btnUploadEdit.value.toString()).slice(-4)}</span>` 
});

  










