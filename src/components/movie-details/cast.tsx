import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PROFILE_URL } from '../../api/tmdb';
import { Typography, Section, PlaceholderImage, Card, LazyImage, OptimizedFlatList } from '../ui';

interface CastSectionProps {
  credits: any;
}

export const CastSection = ({ credits }: CastSectionProps) => {
  const castMembers = credits?.cast || [];

  if (!castMembers.length) return null;
  const renderCastMember = ({ item }: { item: any }) => (
    <Card style={styles.castCard}>
      <View style={styles.castMember}>
        {item.profile_path ? (
          <LazyImage 
            source={{ uri: PROFILE_URL + item.profile_path }} 
            style={styles.castImage}
            placeholder={{
              width: 140,
              height: 150,
              text: "👤",
              backgroundColor: "#f0f0f0",
              textColor: "#999"
            }}
          />
        ) : (
          <PlaceholderImage 
            width={140} 
            height={180} 
            borderRadius={0}
            text="👤"
            backgroundColor="#f0f0f0"
            textColor="#999"
            style={styles.castImage}
          />
        )}
        <Typography variant="subtitle" style={styles.castName}>
          {item.name}
        </Typography>
        <Typography variant="caption" style={styles.castCharacter}>
          {item.character}
        </Typography>
      </View>
    </Card>
  );

  return (
    <Section variant="padded" style={styles.container}>
      <Typography variant="sectionTitle" style={styles.sectionTitle}>
        Top Billed Cast
      </Typography>
      <OptimizedFlatList
        data={castMembers.slice(0, 10)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCastMember}
        contentContainerStyle={styles.castList}
        ListEmptyComponent={
          <Typography variant="caption" style={styles.emptyText}>
            No cast information available.
          </Typography>
        }
      />
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  castList: {
    paddingHorizontal: 2,
  },
  castCard: {
    marginRight: 12,
    width: 140,
    padding: 0,
    borderRadius: 5,
    marginBottom: 1,
    boxShadow: '0px 2px 8px 0px #0000001A'
  },
  castMember: {
    alignItems: 'stretch',
  },
  castImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  castName: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 18,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  castCharacter: {
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
