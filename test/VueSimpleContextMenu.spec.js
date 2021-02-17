import { shallowMount } from '@vue/test-utils'
import VueSimpleContextMenu from '@/vue-simple-context-menu.vue'

describe('VueSimpleContextMenu.vue', () => {
  it('Sets props correctly', async () => {
    let initialPropsData = {
      elementId: 'myPanel1',
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(VueSimpleContextMenu, {
      propsData: {
        elementId: initialPropsData.elementId,
        options: initialPropsData.options
      }
    })

    expect(wrapper.vm.elementId).toBe(initialPropsData.elementId)
    expect(wrapper.vm.options).toBe(initialPropsData.options)
  })

  it('Shows menu on click', async () => {
    let initialPropsData = {
      elementId: 'myPanel1',
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(VueSimpleContextMenu, {
      propsData: {
        elementId: initialPropsData.elementId,
        options: initialPropsData.options
      }
    })

    // Make some test data
    var testEvent = new Event("click", { "bubbles": true, "cancelable": false });
    let testItem = { name: 'Jim', job: 'Salesman' }

    // Trigger the showing of the menu
    wrapper.vm.showMenu(testEvent, testItem)

    // Menu show be showing our selected item
    expect(wrapper.vm.item.name).toBe('Jim')
    expect(wrapper.vm.item.name).toBe('Jim')
  })

  it('Emits event on menu item selection', async () => {
    let initialPropsData = {
      elementId: 'myPanel1',
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(VueSimpleContextMenu, {
      propsData: {
        elementId: initialPropsData.elementId,
        options: initialPropsData.options
      }
    })

    // Make some test data
    var testEvent = new Event("click", { "bubbles": true, "cancelable": false });
    let testItem = { name: 'Jim', job: 'Salesman' }

    // Trigger the showing of the menu
    wrapper.vm.showMenu(testEvent, testItem)

    // Menu show be showing our selected item
    expect(wrapper.vm.item.name).toBe('Jim')
    expect(wrapper.vm.item.job).toBe('Salesman')

    // Manually click an item on the menu
    // Here we know the options because we set them earlier
    wrapper.vm.optionClicked(initialPropsData[0])

    // Check the event was emitted properly
    expect(wrapper.emitted('option-clicked')).toBeTruthy()
  })

  it('Show header correctly', async () => {
    const wrapper = shallowMount(VueSimpleContextMenu, {
      props: {
        elementId: 'context-menu'
      },
      slots: {
        header: `<header class="header">Header</header>`
      }
    })

    const header = wrapper.find('header.header')
    expect(header.text()).toBe('Header')
  })

  it('Show footer correctly', async () => {
    const wrapper = shallowMount(VueSimpleContextMenu, {
      props: {
        elementId: 'context-menu'
      },
      slots: {
        footer: `<footer class="footer">Footer</footer>`
      }
    })

    const footer = wrapper.find('footer.footer')
    expect(footer.text()).toBe('Footer')
  })

  it('Should overwrite menu', async () => {
    const wrapper = shallowMount(VueSimpleContextMenu, {
      props: {
        elementId: 'context-menu'
      },
      slots: {
        default: `
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        `
      }
    })

    const menu = wrapper.find('ul')
    expect(menu.findAll('li').length).toBe(3)
  })
})
