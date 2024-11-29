const filestackClient = filestack.init("A2qfQn434QcSLdlJzVy0vz");
    const uploadBtn = document.getElementById("upload-btn");
    const saveBtn = document.getElementById("save-btn");
    const resultDiv = document.getElementById("result");
    const contactsList = document.getElementById("contacts-list");
    const contactsHeader = document.getElementById("contacts-header");

    let uploadedImageUrl = "";
    let contacts = [];
    let editingContactIndex = null; // For editing

    // Handle image upload
    uploadBtn.addEventListener("click", () => {
      filestackClient.picker({
        onUploadDone: (response) => {
          uploadedImageUrl = response.filesUploaded[0].url;
          resultDiv.innerHTML = `<p>Foto carregada com sucesso!</p>`;
        },
      }).open();
    });

    // Save or update contact
    saveBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value.trim();
      const number = document.getElementById("number").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!name || !number || !description || !uploadedImageUrl) {
        alert("Por favor, preencha todos os campos e faça o upload de uma foto!");
        return;
      }

      const contact = { name, number, description, photo: uploadedImageUrl };

      if (editingContactIndex !== null) {
        // Update existing contact
        contacts[editingContactIndex] = contact;
        editingContactIndex = null;
      } else {
        // Add new contact
        contacts.push(contact);
      }

      renderContacts();
      clearForm();
    });

    // Render contacts list
    function renderContacts() {
      contactsList.innerHTML = "";
      contacts.forEach((contact, index) => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
          <td><img src="${contact.photo}" alt="Foto de ${contact.name}" style="width: 50px; height: 50px;"></td>
          <td>${contact.name}</td>
          <td>${contact.number}</td>
          <td>${contact.description}</td>
          <td class="actions">
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Excluir</button>
          </td>
        `;

        contactsList.appendChild(newRow);

        // Exibe o cabeçalho se houver contatos
        if (contacts.length > 0 && contactsHeader.style.display === "none") {
          contactsHeader.style.display = "table-header-group";
        }
      });
    }


  // Edit contact
  function editContact(index) {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("number").value = contact.number;
    document.getElementById("description").value = contact.description;
    uploadedImageUrl = contact.photo;
    editingContactIndex = index;
  }

// Delete contact
  function deleteContact(index) {
    if (confirm("Tem certeza que deseja apagar este contato?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

// Clear form
  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    document.getElementById("description").value = "";
    resultDiv.innerHTML = "";
    uploadedImageUrl = "";
  }





// // Render contacts list
// function renderContacts() {
//   contactsList.innerHTML = "";
//   contacts.forEach((contact, index) => {
//     const contactItem = document.createElement("li");

//     contactItem.innerHTML = `
//       <strong>Nome:</strong> ${contact.name}<br>
//       <strong>Número:</strong> ${contact.number}<br>
//       <strong>Descrição:</strong> ${contact.description}<br>
//       <img src="${contact.photo}" alt="Foto de ${contact.name}"><br>

//       <button class="action-btn edit" onclick="editContact(${index})">Editar</button>
//       <button class="action-btn delete" onclick="deleteContact(${index})">Apagar</button>
//     `;
//     contactsList.appendChild(contactItem);
//   });
// }
