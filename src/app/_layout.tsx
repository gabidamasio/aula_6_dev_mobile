
import { Tabs } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Tabs
      screenOptions={{
        headerTintColor: '#f26522',
        tabBarActiveTintColor: '#f26522',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meus hábitos',
          tabBarLabel: 'Hábitos',
        }}
      />

      <Tabs.Screen
        name="registrar-foto"
        options={{
          title: 'Foto do hábito',
          tabBarLabel: 'Registrar foto',
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre o app',
          tabBarLabel: 'Sobre',
        }}
      />

      <Tabs.Screen
        name="galeria"
        options={{
          title: 'Galeria de fotos',
          tabBarLabel: 'Galeria',
        }}
      />
    </Tabs>
  );
}