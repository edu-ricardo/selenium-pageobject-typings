// Type definitions for selenium-pageobject
// Project: https://github.com/overnightFailure/selenium-pageobject
// Definitions by: Eduardo Ricardo <https://github.com/edu-ricardo/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../selenium-webdriver/selenium-webdriver.d.ts" />
declare namespace pageobject{
    import Promise = webdriver.promise.Promise;

    interface Workflow{
        steps: elements.Element[];
        _callbacks: Function[];

        _getCallbacks(id: number, pageObject: elements.Element):Function[];
        run(from: number, to: number):Promise<void>;
        stopWorkflow():Promise<void>;
        on(id: number, Function);
    }

    interface OptionsNavigator{
        driver: webdriver.WebDriver;
        waitForAjaxStrategy: Function;
        waitForUrlStrategy: Function;
    }

    class PageNavigator{
        constructor(options: OptionsNavigator);
        visit(url: string):Promise<void>;
        waitForAjax(timeout: number, msg: string);
        waitForUrl(timeout: number, msg: string);        
    }    
}

declare namespace pageobject.elements{    
    import Promise = webdriver.promise.Promise;

    class ElementFactory{
        constructor(driver: webdriver.WebDriver);
        element(locator: webdriver.Locator):Element;
        checkbox(locator: webdriver.Locator):CheckBox;
        textbox(locator: webdriver.Locator):TextBox;
        radiobutton(locator: webdriver.Locator):RadioButton;
        selectlist(locator: webdriver.Locator):SelectList;
        multiselectlist(locator: webdriver.Locator):MultiSelectList;
    }
    
    /**
     * Class Element: class to extend WebElements
     * 
     */
    class Element{
        constructor(driver: webdriver.WebDriver, locator: webdriver.Locator);
        constructor();
        driver: webdriver.WebDriver;
        locator: webdriver.Locator;
        element: Element;
        /**
         * Click in the element 
         */
        click():Promise<void>;
        isDisplayed():Boolean;
        isSelected():Boolean;
        clear():Promise<void>;
        getText():Promise<string>;
        getText():string;
        getAttribute(attr: string):any;
        isElementPresent():Boolean;
        waitFor(timeout: number, msg: string):any;
    } 

    class CheckBox extends Element{
        getChecked():Boolean;
        setChecked(value: Boolean):Promise<Boolean>;
    }

    class TextBox extends Element{
        getValue():string;
        getValue():Promise<string>;
        setValue(value:string):any;
        tabOut():Promise<void>;
    }

    class RadioButton extends Element{
        getSelected():Promise<Boolean>;
        select():Promise<void>;
    }
    
    class SelectBase extends Element{
        getOptions():Promise<webdriver.WebElement[]>;
        getSelectedOptions():Promise<webdriver.WebElement[]>;
        getSelectedValues():Promise<string[]>;
        selectByValue(value: string):void;
        selectByIndex(index: number):Promise<void>;
    }

    class SelectList extends SelectBase {
        getSelectedOption():Promise<string>;
        getFirstSelectedText():Promise<string>;
    }
    
    class MultiSelectList extends SelectBase{
        unselectAll():Promise<void>;
    }    
}

declare module "selenium-pageobject"{
    export = pageobject;
}