import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach } from 'vitest'
import App from './App'

afterEach(() => {
  vi.useRealTimers()
})

describe('App', () => {
  it('renders the home page with navigation', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('navigates between pages', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'About' }))
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Contact' }))
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Home' }))
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })

  it('shows a loading spinner while loading', () => {
    render(<App />)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('adds a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('What needs to be done?'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('does not add an empty todo', () => {
    vi.useFakeTimers()
    render(<App />)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('What needs to be done?'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByText('Buy milk')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '\u00d7' }))
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })
})