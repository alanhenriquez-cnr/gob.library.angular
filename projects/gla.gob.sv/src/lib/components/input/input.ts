import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { UseState, useState } from '../../hooks/useState';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LIBRARY_PREFIX } from '../../const/constants';



//=============================================================================================
//TYPES ---------------------------------------------------------------------------------------
//=============================================================================================



export type InputType =     'button'    | 'checkbox'    | 'color'   | 'date'    | 'datetime-local'  
                        |   'email'     | 'file'        | 'hidden'  | 'image'   | 'month'           
                        |   'number'    | 'password'    | 'radio'   | 'range'   |  'reset'     
                        |   'search'    | 'submit'      | 'tel'     | 'text'    | 'time' 
                        |   'url'       | 'week' 
                        ;

type InputTypeString = string | null;
type InputTypeNumber = number | null;
type InputTypeBoolean = boolean | null;
type InputTypeBooleanTrue = true | null;
type InputTypeBooleanFalse = false | null;



//=============================================================================================
//COMPONENT -----------------------------------------------------------------------------------
//=============================================================================================



@Component({
  selector: 'gla-input',
  imports: [FormsModule, InputTextModule, CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class GlaInputComponent implements OnChanges, OnInit, OnDestroy {

  
  
    //=============================================================================================
    //VARIABLES -----------------------------------------------------------------------------------
    //=============================================================================================


    private readonly prefix = LIBRARY_PREFIX;

    
    //INPUTS -  IN HTML -----------------------------------
    //=====================================================



    // ID personalizado (accesibilidad, asociar con label)
    @Input() inputId: InputTypeString = null;                                                                  
    public id: UseState<InputTypeString> = useState<InputTypeString>(null);                                          

    // Nombre del campo (útil en formularios)
    @Input() inputName: InputTypeString = null;                                                                
    public name: UseState<InputTypeString> = useState<InputTypeString>(null);                                         

    // Etiqueta visible arriba o al lado
    @Input() inputLabel: InputTypeString = null;                                                               
    public label: UseState<InputTypeString> = useState<InputTypeString>(null);
    
    // Valor del input (two-way binding opcional)
    @Input() inputValue: InputTypeString = null;                                                               
    public value: UseState<InputTypeString> = useState<InputTypeString>(null);

     // Tipo de input
    @Input() inputType: InputType = 'text';                                                        
    public type: UseState<InputType> = useState<InputType>('text');

    // Texto de ayuda cuando está vacío
    @Input() inputPlaceholder: InputTypeString = 'placeholder...';                                           
    public placeholder: UseState<InputTypeString> = useState<InputTypeString>('placeholder...');

    // Expresión regular para validación
    @Input() inputPattern: InputTypeString = null;                                                             
    public pattern: UseState<InputTypeString> = useState<InputTypeString>(null);

    // Si el campo es obligatorio
    @Input() inputRequired: InputTypeBoolean = false;                                                        
    public required: UseState<InputTypeBoolean> = useState<InputTypeBoolean>(false);

    // Deshabilita el input
    @Input() inputDisabled: InputTypeBoolean = null;                                                        
    public disabled: UseState<InputTypeBoolean> = useState<InputTypeBoolean>(null);

    // Solo lectura
    @Input() inputReadonly: InputTypeBooleanTrue = null;                                                        
    public readonly: UseState<InputTypeBooleanTrue> = useState<InputTypeBooleanTrue>(null);

    // Enfoca automáticamente al cargar
    @Input() inputAutofocus: InputTypeBooleanTrue = true;                                                       
    public autofocus: UseState<InputTypeBooleanTrue> = useState<InputTypeBooleanTrue>(true);

    // Longitud máxima
    @Input() inputAutocomplete: InputTypeString = 'off';                                                     
    public autocomplete: UseState<InputTypeString> = useState<InputTypeString>('off');

    // Indica si el input está enfocado
    @Input() inputIsFocused: InputTypeBoolean = false;                                                       
    public isFocused: UseState<InputTypeBoolean> = useState<InputTypeBoolean>(false);

    // Texto de ayuda adicional (placeholder - small)
    @Input() inputHint: InputTypeString = null;                                                       
    public hint: UseState<InputTypeString> = useState<InputTypeString>(null);



    //INPUTS -  NOT IN HTML -------------------------------
    //=====================================================


    
    @Input() inputMinlength: InputTypeNumber = 3;                                                            // Longitud mínima
    public minlength: UseState<InputTypeNumber> = useState<InputTypeNumber>(3);

    @Input() inputMaxlength: InputTypeNumber = Number.MAX_VALUE;                                             // Longitud máxima (por defecto es muy alta)   
    public maxlength: UseState<InputTypeNumber> = useState<InputTypeNumber>(Number.MAX_VALUE);

    @Input() inputShowErrors: InputTypeBoolean = false;                                                      // Controla si se muestran errores (viene del formulario)
    public showErrors: UseState<InputTypeBoolean> = useState<InputTypeBoolean>(false);

    @Input() inputErrorMessage: InputTypeString = null;                                                        // Mensaje de error personalizado
    public errorMessage: UseState<InputTypeString> = useState<InputTypeString>(null);

    @Input() inputCustomClass: InputTypeString = null;                                                         // Clase CSS adicional para estilos personalizados
    public customClass: UseState<InputTypeString> = useState<InputTypeString>(null);



    //OUTPUTS -------------------------------------------------------------------------------------



    @Output() valueChange = new EventEmitter<InputTypeString>();



    //=============================================================================================
    //LIFE-CYCLE ----------------------------------------------------------------------------------
    //=============================================================================================



    ngOnChanges(changes: SimpleChanges): void {
        if (changes['inputId']) this.id.set(this.inputId);
        if (changes['inputName']) this.name.set(this.inputName);
        if (changes['inputLabel']) this.label.set(this.inputLabel);
        if (changes['inputValue']) this.value.set(this.inputValue);
        if (changes['inputType']) this.type.set(this.inputType);
        if (changes['inputPlaceholder']) this.placeholder.set(this.inputPlaceholder);
        if (changes['inputPattern']) this.pattern.set(this.inputPattern);
        if (changes['inputRequired']) this.required.set(this.inputRequired);
        if (changes['inputDisabled']) this.disabled.set(this.inputDisabled);
        if (changes['inputReadonly']) this.readonly.set(this.inputReadonly);
        if (changes['inputAutofocus']) this.autofocus.set(this.inputAutofocus);
        if (changes['inputAutocomplete']) this.autocomplete.set(this.inputAutocomplete);
        if (changes['inputIsFocused']) this.isFocused.set(this.inputIsFocused);
        if (changes['inputMinlength']) this.minlength.set(this.inputMinlength);
        if (changes['inputMaxlength']) this.maxlength.set(this.inputMaxlength);
        if (changes['inputShowErrors']) this.showErrors.set(this.inputShowErrors);
        if (changes['inputErrorMessage']) this.errorMessage.set(this.inputErrorMessage);
        if (changes['inputCustomClass']) this.customClass.set(this.inputCustomClass);
        if (changes['inputHint']) this.hint.set(this.inputHint);
    }

    ngOnInit(): void {
        this.value.onChange = (newValue) => {
            console.log(newValue);
        }
    }

    ngOnDestroy(): void {
        
    }


    
    //=============================================================================================
    //METHODS -------------------------------------------------------------------------------------
    //=============================================================================================



    //METHODS - ON --------------------------------------------------------------------------------



    onInputChange(event: Event) {
        const nv = (event.target as HTMLInputElement).value;
        this.value.set(nv)
        this.valueChange.emit(nv);
    }

    onFocus(): void {
        this.isFocused.set(true);
    }

    onBlur(): void {
        this.isFocused.set(false);
    }

    

    //METHODS - LOGICS - [String] -----------------------------------------------------------------
    

    
    logicHasValue(): string {
        return this.value.get() ? 'has-value' : '';
    }

    logicFocused(): string {
        return this.isFocused ? 'focused' : '';
    }

    logicDisabled(): string {
        return this.disabled ? 'disabled' : '';
    }
    
    logicErrorClass(): string {
        return this.showErrors && this.errorMessage ? 'error' : '';
    }
    
    logicInputContainerClass(): string {
        return `${this.prefix}input-component ${this.customClass.get()} ${this.logicErrorClass()} ${this.logicDisabled()} ${this.logicFocused()} ${this.logicHasValue()}`;
    }
    
    logicInputLabelClass(): string {
        return `${this.prefix}input-label`
    }

    logicInputElementClass(): string {
        return `${this.prefix}input-element`;
    }

    logicInputHintClass(): string {
        return `${this.prefix}input-hint`;
    }
    
    

    //METHODS - VALID | SHOW ----------------------------------------------------------------------



    showLabelWithFor(): boolean {
        if (this.label.hasContent() && (this.id.hasContent() || this.name.hasContent())) {
            return true;
        } else {
            console.warn('InputComponent: label is set but id or name is not provided. Label will not be displayed.');
            return false;
        }
    }


    
    //METHODS - GET -------------------------------------------------------------------------------




    idValueToLabelFor(): InputTypeString {
        return this.showLabelWithFor() ? this.id.get() || this.name.get() : null;
    }



    //METHODS - SET -------------------------------------------------------------------------------



}