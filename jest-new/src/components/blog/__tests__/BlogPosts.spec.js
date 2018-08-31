import Vuex from 'vuex'
import { shallow, createLocalVue } from '@vue/test-utils'
import Loader from '@/components/Loader'
import BlogPosts from '@/components/blog/BlogPosts'
import TestHelpers from 'test/test-helpers'
import { getters, mutations, actions } from '@/store/modules/blog'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('@/api', () => ({
  getBlogPosts: jest.fn(() => {
    return new Promise(resolve => {
      process.nextTick(() => {
        resolve({ data: [{ title: 'title 1' }, { title: 'title 2' }] })
      })
    })
  })
}))

describe('BlogPosts', () => {
  let wrapper
  let store
  // eslint-disable-next-line
  let h
  beforeEach(() => {
    store = new Vuex.Store({})
    wrapper = shallowMount(BlogPosts, {
      localVue,
      store
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
