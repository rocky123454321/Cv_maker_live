import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Times-Roman',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20, // more space between sections
  },
  nameHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  contactInfo: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 13,
    marginBottom: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 1,
  },
  entryTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  entryDetails: {
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
});
