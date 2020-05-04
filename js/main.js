$(document).ready(function() {
// ----------------UI-ELEMENTS-------------------------------//
	const button = document.querySelector('.form_footer > button')
	const form = document.querySelector('form')
	const [name, job, telephone, email, select, product1, product2, product3] = form
	const hidden = document.querySelector('.hidden')
	const body = document.body
	const modalWindow = document.querySelector('.modal_wrapper')
	const selectBox = document.querySelector('.selectBox')
	const checkboxes = document.getElementById("checkboxes");
// ----------------STATE-------------------------//
	let state = {
		form : {
			name : { value : null},
			post : { value : null},
			phone : { value : null, isValid : false },
			email : { value : null, isValid : false },
			product1 : { value : null, isValid : false  },
			product2 : { value : null, isValid : false  },
			product3 : { value : null, isValid : false  },

			getValid(key) {
				return this[key].isValid
			},
			isValid(key, value, check) {
				switch (key) {
					case 'phone' :
						const regForPhone = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
						return regForPhone.test(value) ? true : false;

					case 'email':
						const regForEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
						return regForEmail.test(value) ? true : false;

					case 'product1':
						return check ? true : false

					case 'product2':
						return check ? true : false

					case 'product3':
						return check ? true : false

					default :
						return true;

				}
			},
			setValue(key, value, check) {
				let prod1 = this.product1.isValid,
					prod2 = this.product2.isValid,
					prod3 = this.product3.isValid
				switch (key) {
					case 'phone' :
						if(this.isValid(key, value)) {
							this.phone.value = value
							this.phone.isValid = true
							return true
						}
						this.phone.isValid = false
						return false
					case 'email':
						if(this.isValid(key, value)) {
							this.email.value = value
							this.email.isValid = true
							return true
						}
						this.email.isValid = false
						return false

					case 'product1':
						if(this.isValid(key, value, check)) {
							this.product1.value = check
							selectBox.classList.remove('nonValid')
							selectBox.classList.add('valid')
							this.product1.isValid = true
							return true
						}
						this.product1.isValid = false
						if (prod2 || prod3) {
							return true
						} else {
							selectBox.classList.add('nonValid')
							return false
						}


						case 'product2':
						if(this.isValid(key, value, check)) {
							this.product2.value = check
							selectBox.classList.remove('nonValid')
							selectBox.classList.add('valid')
							this.product2.isValid = true
							return true
						}
						this.product2.isValid = false
							this.product2.isValid = false
							if (prod1 || prod3) {
								return true
							} else {
								selectBox.classList.add('nonValid')
								return false
							}


						case 'product3':
						if(this.isValid(key, value, check)) {
							this.product3.isValid = true
							selectBox.classList.remove('nonValid')
							selectBox.classList.add('valid')
							this.product3.value = check
							return true

						}
						this.product3.isValid = false
							this.product3.isValid = false
							if (prod1 || prod2) {
								return true
							} else {
								selectBox.classList.add('nonValid')
								return false
							}
				}
			}

		},
		isApproved() {
			let result = 0
			for (const input of form) {
				input.classList.contains('nonValid') ? result += 1 : result += 0
			}
			selectBox.classList.contains('nonValid') ? result += 1 : result += 0
			return result === 0 ? true : false
		},
		isEmpty() {
				const formKeysArray = Object.keys(this.form).slice(2, 5)
				let result = 0
				for (const key of formKeysArray) {
					this.form[key].value ? result +=1 : result = 0;
				}
				return result === 3 ? false : true;

			}
		}

// ----------------CHOISE--PRODUCT------------------//
	let expanded = false;
	const showCheckboxes = () => {
		if (!expanded) {
			checkboxes.style.maxHeight = checkboxes.scrollHeight + 'px';
			expanded = true;
		} else {
			checkboxes.style.maxHeight = 0;
			expanded = false;
		}
	}
	selectBox.onclick = (event) => showCheckboxes()
// ----------------LISTENERS------------------//
	body.addEventListener('click', e => {
		if (e.target.className === 'modal_btn') {
			modalWindow.style.maxHeight = 0
		}
		if (e.target.className === 'button_hover' && state.isEmpty()) {
			state.form.getValid('phone') ?  null : telephone.classList.add('nonValid')
			state.form.getValid('email') ?  null : email.classList.add('nonValid')
			if (!state.form.getValid('product1') || !state.form.getValid('product2') || !state.form.getValid('product3')) {
				selectBox.classList.add('nonValid')
			}
			button.disabled = true
			button.classList.remove('button_hover')
		} else if (e.target.closest('form')) {
			hidden.style.maxHeight = hidden.scrollHeight + 'px'
		} else hidden.style.maxHeight = 0

	})

	for (let i = 2; i <= form.length - 2; i+=1) {
			form[i].addEventListener("blur", e => {
				const key = e.target.name
				const value = e.target.value
				const check = e.target.checked
				if (state.form.setValue(key, value, check)) {
					e.target.classList.remove('nonValid')
					e.target.classList.add('valid')
					if (state.isApproved()) {
						button.disabled = false
						button.classList.add('button_hover')
					}
				} else {
					if(e.target.type !== 'checkbox') {
						e.target.classList.add('nonValid')
						button.disabled = true
						button.classList.remove('button_hover')
					} else {
						button.disabled = true
						button.classList.remove('button_hover')
					}

				}

			})
	}
// ----------------PHONE--MASK------------------//
	$('#phoneMask').mask('+7(999)999-99-99');
// ----------------AJAX------------------//


		//-----FOR--GITHUB----//
	button.addEventListener("click", (e) => {
		e.preventDefault()
		if(!state.isEmpty() && state.isApproved) {

			setTimeout(() => {
				modalWindow.style.maxHeight = "100vh"
				for (let i = 0; i <= form.length-1; i++){
					selectBox.classList.remove('valid')
					form[i].classList.remove('valid')
					form[i].value = "";
				}
			}, 1000 )
		}
    })


		//-----FOR--Bitrix24----//
		
	// $("#form").submit(function() {
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "rest.php",
	// 		data: $(this).serialize()
	// 	}).done(function() {

	// 		modalWindow.style.maxHeight = "100vh"
	// 		for (let i = 0; i <= form.length-1; i++){
	// 			selectBox.classList.remove('valid')
	// 			form[i].classList.remove('valid')
	// 			form[i].value = "";
	// 		}
	// 	});
	// 	return false;
	// });

});
