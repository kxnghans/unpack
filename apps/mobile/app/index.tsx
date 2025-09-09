import { Redirect } from 'expo-router'

/**
 * The root index page of the app.
 * This component redirects the user to the main planning screen.
 */
export default function RootIndex() {
  return <Redirect href="/planning" />
}
