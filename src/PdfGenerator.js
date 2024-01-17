import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, PDFDownloadLink } from '@react-pdf/renderer';
import { get, split } from 'lodash';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  card: {
    // border: '1px solid #000',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row', // Display content in a row
    alignItems: 'center', // Align items vertically in the center
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, // Add some spacing between heading and time
  },
  content: {
    fontSize: 14,
    padding: 10,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});

const MyDocument = ({ time, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.heading}>EARLY MORNING</Text>
        <Text style={styles.time}>{get(time, "dia_diary_food_timing_food_earlymorning_time")}</Text>
      </View>
      <View style={styles.card}>{split(get(data, "food_earlymorning_snack_option"),"Or").map((item,index) => <Text> {item}</Text>)}</View>
    </Page>
  </Document>
);

const PdfGenerator = ({ data , time }) => {
  return (
    <div><button>
      <PDFDownloadLink document={<MyDocument data={data} time={time}/>} fileName="custum.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
      </button>
    </div>
  );
};

export default PdfGenerator;
