﻿/*'use strict'*/

/*import { Home } from './home.module';*/

(function ($) {




    /**
     * 
     * @returns 
    */

   
    async function initLoadForm() {

        

        document.getElementById("CollCompareRef").setAttribute("readonly", "true");
        document.getElementById("RowStartRef").setAttribute("readonly", "true");
        document.getElementById("CollCopyRef").setAttribute("readonly", "true");

        document.getElementById("SheetChange").setAttribute("readonly", "true");
        document.getElementById("SheetRef").setAttribute("readonly", "true");

        document.getElementById("RowStartChange").setAttribute("readonly", "true");
        document.getElementById("CollSearchChange").setAttribute("readonly", "true");
        document.getElementById("CollPastChange").setAttribute("readonly", "true");
        document.getElementById("PathReference").addEventListener("change", function () {
            if (this.files.length === 0) {
                document.getElementById("CollCompareRef").setAttribute("readonly", "true");
                document.getElementById("RowStartRef").setAttribute("readonly", "true");
                document.getElementById("CollCopyRef").setAttribute("readonly", "true");
                document.getElementById("SheetRef").setAttribute("readonly", "true");
            } else {
               // console.log("Arquivo selecionado:", this.files[0].name);
                document.getElementById("CollCompareRef").removeAttribute("readonly", "true");
                document.getElementById("RowStartRef").removeAttribute("readonly", "true");
                document.getElementById("CollCopyRef").removeAttribute("readonly", "true");
                document.getElementById("SheetRef").removeAttribute("readonly", "true");
            }
        });

        document.getElementById("PathChange").addEventListener("change", function () {
            if (this.files.length === 0) {                
                document.getElementById("RowStartChange").setAttribute("readonly", "true");
                document.getElementById("CollSearchChange").setAttribute("readonly", "true");
                document.getElementById("CollPastChange").setAttribute("readonly", "true");
                document.getElementById("SheetChange").setAttribute("readonly", "true");

            } else {
                //console.log("Arquivo selecionado:", this.files[0].name);
                document.getElementById("RowStartChange").removeAttribute("readonly", "true");
                document.getElementById("CollSearchChange").removeAttribute("readonly", "true");
                document.getElementById("CollPastChange").removeAttribute("readonly", "true");
                document.getElementById("SheetChange").removeAttribute("readonly", "true");

            }
        });   
    }


    //async function initLoadTable() {
    //     <td>${result.}</td>
    //                        <td>${result.linhaSearch}</td>
    //                        <td>${result.nameFound}</td>
    //                        <td>${result.linhaFound}</td>
    //                        <td>${result.numSegSoc}</td>
        
    //        $('#table').bootstrapTable({
    //            url: '/Home/Index',
    //            pagination: true,
    //            search: true,
    //            columns: [{
    //                field: 'nameSearch',
    //                title: 'ID',
    //                sortable: true
    //            }, {
    //                field: 'name',
    //                title: 'Nome',
    //                sortable: true
    //            }, {
    //                field: 'price',
    //                title: 'Preço',
    //                sortable: true
    //            }]
    //        });
      
    //}
    async function initValideteForm() {
      
        document.getElementById("frmIndex").addEventListener("submit", async function (event) {
            event.preventDefault(); // Impede o envio automático do formulário
      
            let spinner = document.getElementById("spinner");
            let spinnerProc = document.getElementById("spinnerProc");
            let btnSubmit = document.getElementById("btnSubmit");

            let divMensagem = document.getElementById("divMensagem");
            let divResultado = document.getElementById("divResultado");
            let btnActualizar = document.getElementById("btnActualizar");
            let btnDescarregar = document.getElementById("btnDescarregar");
          

           
            let rowStartChange = document.getElementById("RowStartChange");
            let collSearchChange = document.getElementById("CollSearchChange");
            let collPastChange = document.getElementById("CollPastChange");
            let collCompareRef = document.getElementById("CollCompareRef");
            let rowStartRef = document.getElementById("RowStartRef");
            let collCopyRef = document.getElementById("CollCopyRef"); 
            let similary = document.getElementById("Similary");
            let pathChange = document.getElementById("PathChange");
            let pathReference = document.getElementById("PathReference");
            let sheetChange = document.getElementById("SheetChange"); 
            let sheetRef = document.getElementById("SheetRef");

            let errorRowStartChange = document.getElementById("RowStartChange");
            let errorCollSearchChange = document.getElementById("CollSearchChange");
            let errorCollPastChange = document.getElementById("CollPastChange");
            let errorCollCompareRef = document.getElementById("CollCompareRef");
            let errorRowStartRef = document.getElementById("RowStartRef");
            let errorCollCopyRef = document.getElementById("CollCopyRef");
            let errorSimilary = document.getElementById("Similary");
            let errorPathChange = document.getElementById("PathChange");
            let errorPathReference = document.getElementById("PathReference");

            if (rowStartChange.value.trim() === "") {
               
                errorRowStartChange.style.display = "block"; // Mostra a mensagem de erro
                return; // Impede o envio do formulário
            } else {
                
                //errorRowStartChange.style.display = "none"; // Oculta a mensagem de erro
                spinner.classList.remove("d-none"); // Mostra o spinner 
                spinnerProc.classList.remove("visually-hidden"); 
                btnSubmit.setAttribute("disabled", "true"); // Desabilita o botão
                
                document.getElementById("RowStartChange").setAttribute("readonly", "true");
                document.getElementById("CollSearchChange").setAttribute("readonly", "true");
                document.getElementById("CollPastChange").setAttribute("readonly", "true");
                document.getElementById("SheetChange").setAttribute("readonly", "true");

                document.getElementById("CollCompareRef").setAttribute("readonly", "true");
                document.getElementById("RowStartRef").setAttribute("readonly", "true");
                document.getElementById("CollCopyRef").setAttribute("readonly", "true");

                document.getElementById("SheetRef").setAttribute("readonly", "true");
            } 


            // Criar o objeto de dados do formulário
            let formData = new FormData(this);

           // try {


                //const response = await fetch('http://localhost:5000/api/produtos');
                //const produtos = await response.json();

                //const tabela = document.getElementById("tabela-produtos");
                //tabela.innerHTML = ""; // Limpa a tabela antes de inserir os dados

            const tabelaPendente = document.getElementById("tbSimilares");
            tabelaPendente.innerHTML = ""; // Limpa a tabela antes de inserir os dados

            const tabelaErro = document.getElementById("tbErros");
            tabelaErro.innerHTML = ""; // Limpa a tabela antes de inserir os dados

                //const response = await
                fetch(this.action, { method: "POST", body: formData })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        data.errosPesquisa.forEach(result => {
                            const rows = `<tr>
                            <td>${result.planilha}</td>
                            <td>${result.linha}</td>
                            <td>${result.coluna}</td>
                            <td>${result.mensagem}</td>                           
                                         
                            </tr>`;
                            tabelaErro.innerHTML += rows;
                        });
                        data.pendentes.forEach(result => {
                            const row = `<tr>
                            <td>${result.nameSearch}</td>
                            <td>${result.linhaSearch}</td>
                            <td>${result.nameFound}</td>
                            <td>${result.linhaFound}</td>
                            <td>${result.numSegSoc}</td>
                            <td>
                                 <input type="checkbox"  class="row-checkbox">                         
                            </td>               
                            </tr>`;
                            tabelaPendente.innerHTML += row;
                        });
                       // document.getElementById("resultado").innerText = result;
                        spinner.classList.add("d-none"); // Mostra o spinner 
                        spinnerProc.classList.add("visually-hidden"); 
                        btnSubmit.classList.add("visually-hidden"); 

                        divMensagem.classList.remove("visually-hidden"); 
                        divResultado.classList.remove("visually-hidden"); 
                        btnActualizar.classList.remove("visually-hidden"); 
                        btnDescarregar.classList.remove("visually-hidden"); 

                    })
                //console.log(response);
              
                //const results = await response.json(); // Supondo que o servidor retorne um JSON
                //const tabela = document.getElementById("tbSimilares");
                //tabela.innerHTML = ""; // Limpa a tabela antes de inserir os dados
                //console.log(Array.isArray(results));
            //results.forEach(result => 
          
                
               
                //} 
                    .catch(error => 
                    {
                        console.log("Erro ao enviar:", error);
                        //document.getElementById("resultado").innerText = "Erro no envio!";
                        spinner.classList.add("d-none"); // Mostra o spinner 
                        spinnerProc.classList.add("visually-hidden");
                    }
                ) 

            // Se a validação passou, faça o submit manualmente
           // this.submit();
            
        });

    }
    async function initUpDataSimilares() {
        document.getElementById("btnActualizar").addEventListener("click", function () {
            console.log("entrue no evento");
            let dadosSelecionados = [];
            let collPastChange = document.getElementById("CollPastChange"); 
            let pathChange = document.getElementById("PathChange");
            const tabela = document.getElementById("divResultado");
            const divResultado = document.getElementById("divResultado");
            let divMensagemSucessUp = document.getElementById("divMensagemSucessUp");
            let btnDescarregar = document.getElementById("btnDescarregar");
            let btnActualizar = document.getElementById("btnActualizar");
            let sheetChange = document.getElementById("SheetChange");

            spinnerUp.classList.remove("d-none"); // Mostra o spinner 
            spinnerProc.classList.remove("visually-hidden"); 
           

            var tmpPathChange = pathChange.value
            const fileName = tmpPathChange.replace("C:\\fakepath\\", "");

            document.querySelectorAll(".tbSimilare tr").forEach(row => {
                let checkbox = row.querySelector(".row-checkbox");
                console.log("nome do:" + checkbox);
                console.log(checkbox.checked);
                if (checkbox.checked) {
                    let dadosLinha = {
                        nameSearch: row.cells[0].textContent,
                        linhaSearch: row.cells[1].textContent,
                        numSegSoc: row.cells[4].textContent,
                        collPastChange: collPastChange.value,
                        pathChange: fileName,
                        sheetChange: SheetChange.value

                    };
                    dadosSelecionados.push(dadosLinha);
                }
            });
           // console.log(dadosSelecionados + "  " + dadosSelecionados.numSegSoc );
            //document.getElementById("resultado").textContent = JSON.stringify(dadosSelecionados);// dadosSelecionados[1].linhaSearch;
            if (dadosSelecionados.length > 0) {
                fetch("/Home/UpdateFileCopy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dadosSelecionados)
                })
                    .then(response => response.json())
                    .then(data => {
                        
                        if (data !== false) {
                            tabela.innerHTML = "";
                            divResultado.classList.add("visually-hidden");
                            divMensagemSucessUp.classList.remove("visually-hidden");
                            //btnDescarregar.setAttribute("disabled", "true");
                            btnActualizar.setAttribute("disabled", "true");

                            spinnerUp.classList.add("d-none"); // Mostra o spinner 
                            spinnerProc.classList.add("visually-hidden");
                            
                        }
                    })
                    .catch(error => console.error("Erro ao enviar dados:", error));

            }

        })
            
    }

    async function initDowloadFile() {
        document.getElementById("btnDescarregar").addEventListener("click", function () {
            //console.log("entrue no evento");

            let pathChange = document.getElementById("PathChange");
            const tabela = document.getElementById("divResultado");
            const divResultado = document.getElementById("divResultado");
            let divMensagemSucessDow = document.getElementById("divMensagemSucessDow");
            let btnDescarregar = document.getElementById("btnDescarregar");
            let btnActualizar = document.getElementById("btnActualizar");

            spinnerDow.classList.remove("d-none"); // Mostra o spinner
            spinnerProc.classList.remove("visually-hidden");


            var tmpPathChange = pathChange.value
            const fileName = tmpPathChange.replace("C:\\fakepath\\", "");


            //// console.log(dadosSelecionados + "  " + dadosSelecionados.numSegSoc );
            ////document.getElementById("resultado").textContent = JSON.stringify(dadosSelecionados);// dadosSelecionados[1].linhaSearch;

            //    fetch("/Home/DownloadFile", {
            //        method: "POST",
            //        headers: {
            //            "Content-Type": "application/json"
            //        },
            //        body: JSON.stringify(fileName)
            //    })
            //        .then(response => response.json())
            //        .then(data => {
            //            if (data !== false) {
            //                tabela.innerHTML = "";
            //                divResultado.classList.add("visually-hidden");
            //                divMensagemSucessUp.classList.remove("visually-hidden");
            //                btnDescarregar.setAttribute("disabled", "true");
            //                btnActualizar.setAttribute("disabled", "true");

            //                spinnerUp.classList.add("d-none"); // Mostra o spinner
            //                spinnerProc.classList.add("visually-hidden");

            //            }
            //        })
            //        .catch(error => console.error("Erro ao enviar dados:", error));


            const url = `/download/${fileName}`;
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            tabela.innerHTML = "";
            divResultado.classList.add("visually-hidden");
            divMensagemSucessDow.classList.remove("visually-hidden");
            btnDescarregar.setAttribute("disabled", "true");
            btnActualizar.setAttribute("disabled", "true");

            spinnerDow.classList.add("d-none"); // Mostra o spinner
            spinnerProc.classList.add("visually-hidden");

            }

        )

    }
    
    function init() {
        initLoadForm();
        initValideteForm();
        initUpDataSimilares();
        initDowloadFile();
    }
    init();

})(jQuery)