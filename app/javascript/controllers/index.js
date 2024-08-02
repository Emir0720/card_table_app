import { Application } from "@hotwired/stimulus";
import CardFormController from "./card_form_controller";
import DragDropController from "./drag_drop_controller";
import MenuController from "./menu_controller";
import ColumnFormController from "./column_form_controller";
import ColumnMenuController from "./column_menu_controller";

const application = Application.start();
application.register("card-form", CardFormController);
application.register("drag-drop", DragDropController);
application.register("menu", MenuController);
application.register("column-form", ColumnFormController);
application.register("column-menu", ColumnMenuController);

export { application };
