import { Category, CategoryInfo, SubCategory } from "../model/Category";
import { Status } from "../model/Status";
import StateCallback from "../utils/StateCallback";

export interface CategoryRepository extends Repository {

    createCategory(category: Category, callback: StateCallback<string, Status>): any;

    updateCategory(category: Category, callback: StateCallback<boolean, Status>): any;

    deleteCategory(categoryId: string, callback: StateCallback<boolean, Status>): any;

    getAllCategories(callback: StateCallback<CategoryInfo, Status>): any;

    createSubCategory(subCategory: SubCategory, callback: StateCallback<string, Status>): any;

    updateSubCategory(subCategory: SubCategory, callback: StateCallback<boolean, Status>): any;

    deleteSubCategory(subCategoryId: string, callback: StateCallback<boolean, Status>): any;
}