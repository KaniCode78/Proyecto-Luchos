
document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const changeThemeBtn = document.getElementById("changeThemeBtn");
    const inputNmascota = document.getElementById("inputNmascota");
    const inputSexo = document.getElementById("inputSexo");
    const inputEdad = document.getElementById("inputEdad");
    const inputRaza = document.getElementById("inputRaza");
    const inputColor = document.getElementById("inputColor");
    const inputSeguro = document.getElementById("inputSeguro");
    const inputSenas = document.getElementById("inputSenas");
    const tableBody = document.getElementById("tableBody");

    function loadData() {
        loadTheme();
        tableBody.innerHTML = `
        <tr id="noData">
            <td colspan="9" class="text-center">No hay datos</td>
        </tr>
            `;
        const data = JSON.parse(localStorage.getItem("data")) || [];
        if (data.length) {
            document.getElementById("noData").remove();
        }
        data.forEach(({peludo, sexo, edad, raza, color, seguro, senas}, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${peludo}</td>
                <td>${sexo}</td>
                <td>${edad}</td>
                <td>${raza}</td>
                <td>${color}</td>
                <td>${seguro}</td>
                <td>${senas}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
                    <button type="button" class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    const clearForm = () => {
        inputNmascota.value = "";
        inputSexo.value = "";
        inputEdad.value = "";
        inputRaza.value = "";
        inputColor.value = "";
        inputSeguro.value = "";
        inputSenas.value = "";
    }

    saveBtn.addEventListener("click", () => {
        const peludo = inputNmascota.value;
        const sexo = inputSexo.value;
        const edad = inputEdad.value;
        const raza = inputRaza.value;
        const color = inputColor.value;
        const seguro = inputSeguro.value;
        const senas = inputSenas.value;
        if (!peludo) {
            return;
        }
        const data = JSON.parse(localStorage.getItem("data")) || [];
        const index = saveBtn.getAttribute("data-index");
        console.log(index, "index");
        if (index) {
            data[index] = { peludo, sexo, edad, raza, color, seguro, senas };
            saveBtn.removeAttribute("data-index");
            saveBtn.textContent = "Guardar";
        } else {
            data.push({ peludo, sexo, edad, raza, color, seguro, senas });
        }
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
        clearForm();
    });

    function loadTheme() {
        const theme = localStorage.getItem("theme") || "light";
        document.body.dataset.bsTheme = theme;
        if (theme == "dark") {
            changeThemeBtn.textContent = "Light Mode";
        } else {
            changeThemeBtn.textContent = "Dark Mode";
        }
    }

    changeThemeBtn.addEventListener("click", function () {
        let body = document.body;

        if (body.dataset.bsTheme == "dark") {
            body.dataset.bsTheme = "light";
            changeThemeBtn.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        } else {
            body.dataset.bsTheme = "dark";
            changeThemeBtn.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        }
    });

    tableBody.addEventListener("click", function (e) {
        console.log(e.target.classList);
        if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            const item = data[index];
            inputNmascota.value = item.peludo;
            inputSexo.value = item.sexo;
            inputEdad.value = item.edad;
            inputRaza.value = item.raza;
            inputColor.value = item.color;
            inputSeguro.value = item.seguro;
            inputSenas.value = item.senas;
            saveBtn.textContent = "Actualizar";
            saveBtn.setAttribute("data-index", index);
        } else if (e.target.classList.contains("btn-delete")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            data.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(data));
            loadData();
        }
    });

    loadData();
});
