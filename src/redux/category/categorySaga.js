import { takeEvery, all, put, call } from 'redux-saga/effects';
import categoryType from './categoryType';
import httpCategory from '../../api/apiCategory';
import { Modal } from 'antd'

export default function* userSaga() {
  yield all([
    postCategories(),
    putCategories(),
    getCategories(),
    deleteCategories(),
    getCategoriesDetailCategory()
  ]);
}

function* postCategories() {
  yield takeEvery(categoryType.POST_CATEGORIES, function* ({ payload }) {
    try {
      console.log("payload", payload)
      const res = yield call(httpCategory.postCategories, payload);
      const { data, message } = res;
      console.log(res)
      if (message === 'Success!') {
        Modal.success({
          title: 'Success',
          content: 'you have added new category successfully',
        });
        yield put({ type: categoryType.POST_CATEGORIES_SUCCESS, payload: {} });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}

function* putCategories() {
  yield takeEvery(categoryType.PUT_CATEGORIES, function* ({ payload }) {
    try {
      
    } catch (e) { console.log(e) }
  });
}

function* getCategories() {
  yield takeEvery(categoryType.GET_CATEGORIES, function* ({ page, limit }) {
    try {
      const res = yield call(httpCategory.getCategories, { page, limit });
      const { data, message } = res;
      if (message === 'Success!') {
        yield put({ type: categoryType.GET_CATEGORIES_SUCCESS, payload: { data: res.data.list, total: res.data.total } });
      } else {
        Modal.error({
          title: 'Error',
          content: `${message}!`,
        });
      }
    } catch (e) { console.log(e) }
  });
}

function* deleteCategories() {
  yield takeEvery(categoryType.DELETE_CATEGORIES, function* ({ categoryID }) {
    try {

    } catch (e) { console.log(e) }
  });
}

function* getCategoriesDetailCategory() {
  yield takeEvery(categoryType.GET_CATEGORIES_DETAIL_CATEGORY, function* ({ categoryID }) {
    try {

    } catch (e) { console.log(e) }
  });
}
