import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const INITIAL_POSTS = [
  { id: '1', user: 'Ana Silva', image: 'https://picsum.photos/seed/picsum/400/300', description: 'Belo dia no parque!' },
  { id: '2', user: 'João Souza', image: 'https://picsum.photos/seed/tech/400/300', description: 'Codando o projeto de Feed!' },
];

export default function SocialApp() {
  const [tab, setTab] = useState('feed'); // Controle de abas: 'feed' ou 'perfil'
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePost = () => {
    if (inputText && imageUrl) {
      const newPost = {
        id: Math.random().toString(),
        user: 'Eu',
        image: imageUrl,
        description: inputText,
      };
      setPosts([newPost, ...posts]);
      setInputText('');
      setImageUrl('');
    }
  };

  // --- COMPONENTE DE FEED ---
  const renderFeed = () => (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="No que está pensando?" 
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
          />
          <TextInput 
            placeholder="Link da imagem (URL)..." 
            style={styles.inputSmall}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.postCard}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <View style={styles.postFooter}>
            <View style={styles.userAvatarSmall} />
            <View>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );

  // --- COMPONENTE DE PERFIL ---
  const renderPerfil = () => {
    const meusPosts = posts.filter(p => p.user === 'Eu');

    return (
      <ScrollView style={styles.container}>
        {/* Header do Perfil conforme o Wireframe */}
        <View style={styles.profileHeader}>
          <View style={styles.banner} />
          <View style={styles.avatarContainer}>
            <View style={styles.userAvatarLarge} />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Eu</Text>
          <Text style={styles.profileBio}>Desenvolvedor React Native | Criando meu primeiro Feed Social.</Text>
        </View>

        {/* Botões de Ação do Perfil (Estilo Wireframe) */}
        <View style={styles.profileActions}>
          <View style={styles.actionBlock} />
          <View style={styles.actionBlock} />
          <View style={styles.actionBlock} />
          <View style={styles.actionBlock} />
        </View>

        {/* Grid de Fotos */}
        <Text style={styles.gridTitle}>Minhas Publicações</Text>
        <View style={styles.grid}>
          {meusPosts.map((item) => (
            <Image key={item.id} source={{ uri: item.image }} style={styles.gridImage} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Renderização Condicional */}
      {tab === 'feed' ? renderFeed() : renderPerfil()}

      {/* Barra de Navegação Inferior */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setTab('feed')} style={styles.tabItem}>
          <Text style={[styles.tabText, tab === 'feed' && styles.tabActive]}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('perfil')} style={styles.tabItem}>
          <Text style={[styles.tabText, tab === 'perfil' && styles.tabActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  // Estilos do Feed
  inputContainer: { padding: 15, backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderColor: '#ddd', paddingTop: 40 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 },
  inputSmall: { backgroundColor: '#fff', borderRadius: 8, padding: 8, fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  postCard: { margin: 15, backgroundColor: '#eee', borderRadius: 15, overflow: 'hidden' },
  postImage: { width: '100%', height: 250, backgroundColor: '#ccc' },
  postFooter: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  userAvatarSmall: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#888', marginRight: 10 },
  userName: { fontWeight: 'bold' },
  postDescription: { color: '#555' },

  // Estilos do Perfil (Baseado no Wireframe)
  profileHeader: { height: 200, marginBottom: 60 },
  banner: { height: 150, backgroundColor: '#aaa' },
  avatarContainer: { position: 'absolute', bottom: 0, alignSelf: 'center' },
  userAvatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#666', borderWidth: 4, borderColor: '#fff' },
  profileInfo: { alignItems: 'center', paddingHorizontal: 20 },
  profileName: { fontSize: 22, fontWeight: 'bold' },
  profileBio: { color: '#666', textAlign: 'center', marginTop: 5 },
  
  profileActions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, paddingHorizontal: 10 },
  actionBlock: { width: 70, height: 35, backgroundColor: '#ddd', borderRadius: 10 },

  gridTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 5 },
  gridImage: { width: (width / 2) - 15, height: 150, margin: 5, borderRadius: 10, backgroundColor: '#eee' },

  // Barra de Abas
  tabBar: { flexDirection: 'row', height: 60, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabText: { fontSize: 16, color: '#888' },
  tabActive: { color: '#007AFF', fontWeight: 'bold' }
});