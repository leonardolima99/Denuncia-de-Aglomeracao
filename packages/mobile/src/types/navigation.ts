export type RootStackParamList = {
  Home: undefined
  Denunciations: undefined | { reload: boolean }
  Detail: { denunciation_id: number }
  BackToMap: undefined
  NewDenunciation: {
    position: [number, number]
  }
}
